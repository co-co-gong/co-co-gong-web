import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { DEFAULT_REVALIDATE } from "@/shared/constants/api";
import { UNAUTHORIZED_STATUS } from "@/shared/constants/auth";
import { ACCESS_TOKEN_KEY } from "@/shared/constants/storage";
import { isFetchSuccess } from "@/shared/lib";

import type { GetOptions, MutateOptions } from "../apiServer";

class AuthApiServer {
  private static instance: AuthApiServer;

  private constructor() {}

  static getInstance() {
    if (!AuthApiServer.instance) {
      AuthApiServer.instance = new AuthApiServer();
    }
    return AuthApiServer.instance;
  }

  async get<T>(url: string, options?: GetOptions): Promise<T> {
    const params = new URLSearchParams(options?.params).toString();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}?${params}`, {
        next: { revalidate: options?.revalidate ?? DEFAULT_REVALIDATE, tags: options?.tags },
        cache: options?.cache,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken?.value}`,
        },
      });

      if (!response.ok) throw new Error();
      const data = (await response.json()) as T;
      return data;
    } catch {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/refresh`, { method: "POST" });
      if (isFetchSuccess(response)) return this.get<T>(url, options);
      return {
        status: UNAUTHORIZED_STATUS,
        message: "Unauthorized",
        data: null,
        timestamp: new Date().toISOString(),
      } as T;
    }
  }

  async post<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("POST", url, options);
  }

  async put<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("PUT", url, options);
  }

  async patch<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("PUT", url, options);
  }

  async delete<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("DELETE", url, options);
  }

  private async mutate<T>(method: string, url: string, options?: MutateOptions) {
    const params = new URLSearchParams(options?.params).toString();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_KEY);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}?${params}`, {
      method,
      body: JSON.stringify(options?.body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    options?.revalidateTags?.forEach((tag) => revalidateTag(tag));
    options?.revalidatePath?.forEach((path) => revalidatePath(path.path, path.type));

    const data = (await response.json()) as T;
    return data;
  }
}

export const authApiServer = AuthApiServer.getInstance();
