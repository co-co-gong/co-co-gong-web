"use client";

import { useLayoutEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { handleGithubLogin } from "@/views/auth/api";

const GithubCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
    if (!accessToken || !refreshToken) return router.replace("/auth");
    handleGithubLogin({ accessToken, refreshToken }).then(() => router.replace("/"));
  }, [router, searchParams]);

  return null;
};

export default GithubCallbackPage;
