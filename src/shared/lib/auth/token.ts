"use server";

import type { TokenDTO } from "@/shared/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { getCookie, removeCookie, setCookie } from "@/shared/lib/cookies";

export const getAccessToken = async () => await getCookie(ACCESS_TOKEN_KEY);
export const getRefreshToken = async () => await getCookie(REFRESH_TOKEN_KEY);
export const getTokens = async () => {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  return { accessToken, refreshToken };
};

export const setAccessToken = async (accessToken: string) => await setCookie(ACCESS_TOKEN_KEY, accessToken);
export const setRefreshToken = async (refreshToken: string) => await setCookie(REFRESH_TOKEN_KEY, refreshToken);
export const setTokens = async ({ accessToken, refreshToken }: TokenDTO) => {
  await Promise.all([setAccessToken(accessToken), setRefreshToken(refreshToken)]);
};

export const removeAccessToken = async () => await removeCookie(ACCESS_TOKEN_KEY);
export const removeRefreshToken = async () => await removeCookie(REFRESH_TOKEN_KEY);
export const removeTokens = async () => await Promise.all([removeAccessToken(), removeRefreshToken()]);
