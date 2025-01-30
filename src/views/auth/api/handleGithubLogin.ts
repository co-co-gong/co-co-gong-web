import type { TokenDTO } from "@/shared/api/auth/auth.interface";

export const handleGithubLogin = async ({ accessToken, refreshToken }: TokenDTO) => {
  const params = new URLSearchParams({ accessToken, refreshToken });
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/github/callback?${params.toString()}`, {
    method: "POST",
  });
};
