"use server";

import type { TokenDTO } from "@/shared/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { getCookie, removeCookie, setCookie } from "@/shared/lib/serverCookies";

export const getServerAccessToken = async () => await getCookie(ACCESS_TOKEN_KEY);
export const getServerRefreshToken = async () => await getCookie(REFRESH_TOKEN_KEY);
export const getServerTokens = async () => {
  const accessToken = await getServerAccessToken();
  const refreshToken = await getServerRefreshToken();
  return { accessToken, refreshToken };
};

export const setServerAccessToken = async (accessToken: string) => await setCookie(ACCESS_TOKEN_KEY, accessToken);
export const setServerRefreshToken = async (refreshToken: string) => await setCookie(REFRESH_TOKEN_KEY, refreshToken);
export const setServerTokens = async ({ accessToken, refreshToken }: TokenDTO) => {
  await Promise.all([setServerAccessToken(accessToken), setServerRefreshToken(refreshToken)]);
};

export const removeServerAccessToken = async () => await removeCookie(ACCESS_TOKEN_KEY);
export const removeServerRefreshToken = async () => await removeCookie(REFRESH_TOKEN_KEY);
export const removeServerTokens = async () =>
  await Promise.all([removeServerAccessToken(), removeServerRefreshToken()]);
