"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { handleGithubLogin } from "@/views/auth/api";

import { useIsomorphicLayoutEffect } from "@/shared/hooks";

const GithubCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
    if (!accessToken || !refreshToken) return router.replace("/auth");
    handleGithubLogin({ accessToken, refreshToken });
    router.replace("/");
  }, [router, searchParams]);

  return null;
};

export default GithubCallbackPage;
