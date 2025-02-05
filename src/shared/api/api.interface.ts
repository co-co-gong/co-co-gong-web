import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";

import type { TokenDTO } from "@/shared/api/auth";

interface DefaultGetOptions {
  params?: Record<string, string>;
  tags?: string[];
  _tokens?: TokenDTO;
  headers?: HeadersInit | ReadonlyHeaders;
}

interface RevalidateWithNoStore extends DefaultGetOptions {
  cache: "no-store";
}

interface RevalidateWithoutForceCache extends DefaultGetOptions {
  cache: "force-cache";
  revalidate?: number | boolean;
}

interface RevalidateWithDefault extends DefaultGetOptions {
  cache: "default";
}

export type GetOptions = RevalidateWithNoStore | RevalidateWithoutForceCache | RevalidateWithDefault;

export interface RevalidatePathOptions {
  path: string;
  type?: "layout" | "page";
}

export interface MutateOptions {
  params?: Record<string, string>;
  body?: unknown;
  headers?: HeadersInit | ReadonlyHeaders;
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
