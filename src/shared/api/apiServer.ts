import { revalidatePath, revalidateTag } from "next/cache";

import { DEFAULT_REVALIDATE } from "@/shared/constants/api";

export interface GetOptions {
  params?: Record<string, string>;
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
}

export interface RevalidatePathOptions {
  path: string;
  type?: "layout" | "page";
}

export interface MutateOptions {
  params?: Record<string, string>;
  body?: unknown;
  revalidateTags?: string[];
  revalidatePath?: RevalidatePathOptions[];
}

class ApiServer {
  private static instance: ApiServer;

  private constructor() {}

  static getInstance() {
    if (!ApiServer.instance) {
      ApiServer.instance = new ApiServer();
    }
    return ApiServer.instance;
  }

  async get<T>(url: string, options?: GetOptions) {
    const params = new URLSearchParams(options?.params).toString();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}?${params}`, {
      next: { revalidate: options?.revalidate ?? DEFAULT_REVALIDATE, tags: options?.tags },
      cache: options?.cache,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as T;
    return data;
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}?${params}`, {
      method,
      body: JSON.stringify(options?.body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    options?.revalidateTags?.forEach((tag) => revalidateTag(tag));
    options?.revalidatePath?.forEach((path) => revalidatePath(path.path, path.type));

    const data = (await response.json()) as T;
    return data;
  }
}

export const apiServer = ApiServer.getInstance();
