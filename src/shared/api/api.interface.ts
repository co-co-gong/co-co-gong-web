import type { TokenDTO } from "@/shared/api/auth";

export interface GetOptions {
  params?: Record<string, string>;
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
  _tokens?: TokenDTO;
  headers?: HeadersInit;
}

export interface RevalidatePathOptions {
  path: string;
  type?: "layout" | "page";
}

export interface MutateOptions {
  params?: Record<string, string>;
  body?: unknown;
  headers?: HeadersInit;
  _tokens?: TokenDTO;
  revalidateTags?: string[];
  revalidatePath?: RevalidatePathOptions[];
}

export interface BaseFetchApi {
  get<T>(url: string, options?: GetOptions): Promise<T>;
  post<T>(url: string, options?: MutateOptions): Promise<T>;
  put<T>(url: string, options?: MutateOptions): Promise<T>;
  patch<T>(url: string, options?: MutateOptions): Promise<T>;
  delete<T>(url: string, options?: MutateOptions): Promise<T>;
}
