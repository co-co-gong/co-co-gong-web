import { NextResponse } from "next/server";

import { ApiResponseDTO, apiServer } from "@/shared/api";
import type { TokenDTO } from "@/shared/api/auth";
import { isFetchError } from "@/shared/lib";
import { getTokens, removeTokens, setTokens } from "@/shared/lib/auth";

export async function POST() {
  const { accessToken, refreshToken } = await getTokens();

  if (!refreshToken || !accessToken) return NextResponse.error();

  const response = await apiServer.post<ApiResponseDTO<TokenDTO>>("/refresh", {
    body: { accessToken, refreshToken },
  });

  if (isFetchError(response)) {
    await removeTokens();
    return NextResponse.error();
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
  await setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
}
