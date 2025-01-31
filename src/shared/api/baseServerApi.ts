import { revalidatePath, revalidateTag } from "next/cache";

import { DEFAULT_REVALIDATE } from "@/shared/constants/api";
import { getSearchParams } from "@/shared/lib";

import type { BaseFetchApi, GetOptions, MutateOptions } from "./api.interface";

export abstract class BaseServerApi implements BaseFetchApi {
  protected constructor(private readonly baseUrl: string) {}

  async get<T>(url: string, options?: GetOptions) {
    const params = getSearchParams(options?.params, true);
    const response = await fetch(`${this.baseUrl}${url}${params}`, {
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
        ...options?.headers,
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
    return this.mutate<T>("PATCH", url, options);
  }

  async delete<T>(url: string, options?: MutateOptions) {
    return this.mutate<T>("DELETE", url, options);
  }

  protected async mutate<T>(method: string, url: string, options?: MutateOptions): Promise<T> {
    const params = getSearchParams(options?.params, true);
    const response = await fetch(`${this.baseUrl}${url}${params}`, {
      method,
      body: JSON.stringify(options?.body),
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    options?.revalidateTags?.forEach((tag) => revalidateTag(tag));
    options?.revalidatePath?.forEach((path) => revalidatePath(path.path, path.type));

    const data = (await response.json()) as T;
    return data;
  }
}
