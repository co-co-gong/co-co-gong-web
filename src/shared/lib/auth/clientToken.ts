import { deleteCookie, getCookie, setCookie } from "cookies-next/client";

import type { TokenDTO } from "@/shared/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";

export const getClientAccessToken = () => getCookie(ACCESS_TOKEN_KEY);
export const getClientRefreshToken = () => getCookie(REFRESH_TOKEN_KEY);
export const getClientTokens = () => {
  const accessToken = getClientAccessToken();
  const refreshToken = getClientRefreshToken();
  return { accessToken, refreshToken };
};

export const setClientAccessToken = (accessToken: string) => setCookie(ACCESS_TOKEN_KEY, accessToken);
export const setClientRefreshToken = (refreshToken: string) => setCookie(REFRESH_TOKEN_KEY, refreshToken);
export const setClientTokens = ({ accessToken, refreshToken }: TokenDTO) => {
  setClientAccessToken(accessToken);
  setClientRefreshToken(refreshToken);
};

export const removeClientAccessToken = () => deleteCookie(ACCESS_TOKEN_KEY);
export const removeClientRefreshToken = () => deleteCookie(REFRESH_TOKEN_KEY);
export const removeClientTokens = () => {
  removeClientAccessToken();
  removeClientRefreshToken();
};
