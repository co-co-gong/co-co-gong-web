import type { TokenDTO } from "@/shared/api/auth/auth.interface";
import { routeHandlerApi } from "@/shared/api/routeHandlerApi";

export const githubCallbackApi = ({ accessToken, refreshToken }: TokenDTO) =>
  routeHandlerApi.post("/api/auth/github/callback", { params: { accessToken, refreshToken } });

export const refreshApi = ({ accessToken, refreshToken }: TokenDTO) =>
  routeHandlerApi.post<TokenDTO>("/api/auth/refresh", { body: { accessToken, refreshToken } });

export const getTokensApi = () => routeHandlerApi.get<TokenDTO>("/api/auth/tokens", { cache: "no-store" });

export const setTokensApi = ({ accessToken, refreshToken }: TokenDTO) =>
  routeHandlerApi.post("/api/auth/tokens", { body: { accessToken, refreshToken } });

export const removeTokensApi = () => routeHandlerApi.delete("/api/auth/tokens");
