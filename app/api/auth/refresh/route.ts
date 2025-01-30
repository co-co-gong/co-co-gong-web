import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ApiResponseDTO, apiServer } from "@/shared/api";
import type { TokenDTO } from "@/shared/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { isFetchError } from "@/shared/lib";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!refreshToken || !accessToken) return NextResponse.error();

  const response = await apiServer.post<ApiResponseDTO<TokenDTO>>("/refresh", {
    body: { accessToken, refreshToken },
  });

  if (isFetchError(response)) {
    cookieStore.delete(ACCESS_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_KEY);
    return NextResponse.error();
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
  cookieStore.set(ACCESS_TOKEN_KEY, newAccessToken);
  cookieStore.set(REFRESH_TOKEN_KEY, newRefreshToken);

  return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
}
