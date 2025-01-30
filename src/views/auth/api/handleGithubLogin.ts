import type { TokenDTO } from "@/shared/api/auth/auth.interface";
import { routeHandlerApi } from "@/shared/api/routeHandlerApi";

export const handleGithubLogin = async ({ accessToken, refreshToken }: TokenDTO) => {
  return await routeHandlerApi.post("/api/auth/github/callback", { params: { accessToken, refreshToken } });
};
