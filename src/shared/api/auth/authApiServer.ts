import { revalidatePath, revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";

import { TokenDTO } from "@/shared/api/auth/auth.interface";
import { DEFAULT_REVALIDATE } from "@/shared/constants/api";
import { SERVER_AUTH_ERROR } from "@/shared/constants/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { getSearchParams } from "@/shared/lib";

import type { BaseFetchApi, GetOptions, MutateOptions } from "../api.interface";

// NOTE: _tokens를 사용해야 하는 이유,
// NOTE: refresh api의 경우 route handler / server actions에서 처리해야하는 이유
// NOTE: refresh api 호출 시 headers를 넘겨야 하는 이유
class AuthApiServer implements BaseFetchApi {
  private static instance: AuthApiServer;

  private constructor() {}

  static getInstance() {
    if (!AuthApiServer.instance) {
      AuthApiServer.instance = new AuthApiServer();
    }
    return AuthApiServer.instance;
  }

  async get<T>(url: string, options?: GetOptions): Promise<T> {
    const params = getSearchParams(options?.params, true);
    const cookieStore = await cookies();
    const accessToken = options?._tokens?.accessToken || cookieStore.get(ACCESS_TOKEN_KEY)?.value;
    const refreshToken = options?._tokens?.accessToken || cookieStore.get(REFRESH_TOKEN_KEY)?.value;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${params}`, {
        next: {
          revalidate:
            typeof options?.revalidate === "number" || options?.revalidate === false
              ? options.revalidate
              : DEFAULT_REVALIDATE,
          tags: options?.tags,
        },
        cache: options?.cache,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error();
      const data = (await response.json()) as T;
      return data;
    } catch {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/refresh`, {
        method: "POST",
        body: JSON.stringify({ accessToken, refreshToken }),
        headers: await headers(),
      });
      if (response.ok) {
        const { accessToken, refreshToken } = (await response.json()) as TokenDTO;
        return this.get<T>(url, {
          ...options,
          _tokens: { accessToken, refreshToken },
        });
      }
      return SERVER_AUTH_ERROR as T;
    }
  }

  async post<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("POST", url, options);
  }

  async put<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("PUT", url, options);
  }

  async patch<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("PATCH", url, options);
  }

  async delete<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("DELETE", url, options);
  }

  private async mutate<T>(method: string, url: string, options?: MutateOptions): Promise<T> {
    const params = getSearchParams(options?.params, true);
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}${params}`, {
        method,
        body: JSON.stringify(options?.body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error();

      options?.revalidateTags?.forEach((tag) => revalidateTag(tag));
      options?.revalidatePath?.forEach((path) => revalidatePath(path.path, path.type));

      const data = (await response.json()) as T;
      return data;
    } catch {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) return this.get<T>(url, options);

      return SERVER_AUTH_ERROR as T;
    }
  }
}

export const authApiServer = AuthApiServer.getInstance();
