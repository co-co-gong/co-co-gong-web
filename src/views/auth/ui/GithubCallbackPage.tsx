"use client";

import { useLayoutEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { githubCallbackApi } from "@/shared/api/auth/auth.route-handler";

const GithubCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
    if (!accessToken || !refreshToken) return router.replace("/auth");
    githubCallbackApi({ accessToken, refreshToken })
      .then(() => router.replace("/"))
      .catch(() => router.replace("/auth"));
  }, [router, searchParams]);

  return null;
};

export default GithubCallbackPage;
