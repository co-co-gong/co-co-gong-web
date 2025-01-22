import { DEFAULT_REVALIDATE } from "@/shared/constants/api";

interface ApiServerOptions {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
  body?: BodyInit | null;
}

/** SSR / SSG / ISR */
export const apiServer = async <T>(url: string, options?: ApiServerOptions) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    next: { revalidate: options?.revalidate ?? DEFAULT_REVALIDATE, tags: options?.tags },
    cache: options?.cache,
    body: options?.body,
  });

  const data = (await response.json()) as T;
  return data;
};
