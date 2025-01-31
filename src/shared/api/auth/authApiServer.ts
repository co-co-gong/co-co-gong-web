import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";

import { SERVER_AUTH_ERROR } from "@/shared/constants/auth";
import { getSearchParams } from "@/shared/lib";
import { getAccessToken, getRefreshToken, getTokens } from "@/shared/lib/auth";

import { BaseServerApi } from "../baseServerApi";

import type { GetOptions, MutateOptions } from "../api.interface";
import type { TokenDTO } from "./auth.interface";

// NOTE: _tokens를 사용해야 하는 이유,
// NOTE: refresh api의 경우 route handler / server actions에서 처리해야하는 이유
// NOTE: refresh api 호출 시 headers를 넘겨야 하는 이유
class AuthApiServer extends BaseServerApi {
  private static instance: AuthApiServer;

  private constructor() {
    super(process.env.NEXT_PUBLIC_API_URL!);
  }

  static getInstance() {
    if (!AuthApiServer.instance) {
      AuthApiServer.instance = new AuthApiServer();
    }
    return AuthApiServer.instance;
  }

  async get<T>(url: string, options?: GetOptions): Promise<T> {
    const params = getSearchParams(options?.params, true);
    const accessToken = options?._tokens?.accessToken || (await getAccessToken());
    const refreshToken = options?._tokens?.accessToken || (await getRefreshToken());

    if (!accessToken || !refreshToken) return SERVER_AUTH_ERROR as T;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${params}`, {
        next: {
          revalidate: this.getNextRevalidate(options),
          tags: options?.tags,
        },
        cache: options?.cache,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options?.headers,
        },
      });

      if (!response.ok) throw new Error();

      const data = (await response.json()) as T;
      return data;
    } catch {
      return await this.refreshTokens({ accessToken, refreshToken }, async ({ accessToken, refreshToken }) => {
        return await this.get<T>(url, {
          ...(options as GetOptions),
          _tokens: { accessToken, refreshToken },
        });
      });
    }
  }

  async mutate<T>(method: string, url: string, options?: MutateOptions): Promise<T> {
    const params = getSearchParams(options?.params, true);
    const { accessToken, refreshToken } = await getTokens();

    if (!accessToken || !refreshToken) return SERVER_AUTH_ERROR as T;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${params}`, {
        method,
        body: JSON.stringify(options?.body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options?.headers,
        },
      });

      if (!response.ok) throw new Error();

      options?.revalidateTags?.forEach((tag) => revalidateTag(tag));
      options?.revalidatePath?.forEach((path) => revalidatePath(path.path, path.type));

      const data = (await response.json()) as T;
      return data;
    } catch {
      return await this.refreshTokens({ accessToken, refreshToken }, async ({ accessToken, refreshToken }) => {
        return await this.mutate<T>(method, url, {
          ...options,
          _tokens: { accessToken, refreshToken },
        });
      });
    }
  }

  private async refreshTokens<T>(
    tokens: Partial<TokenDTO>,
    callback: (tokens: TokenDTO) => T | Promise<T>,
  ): Promise<T> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/refresh`, {
      method: "POST",
      body: JSON.stringify(tokens),
      headers: await headers(),
    });

    if (response.ok) {
      const { accessToken, refreshToken } = (await response.json()) as TokenDTO;
      return await callback({ accessToken, refreshToken });
    }
    return SERVER_AUTH_ERROR as T;
  }
}

export const authApiServer = AuthApiServer.getInstance();
