import { NextResponse } from "next/server";

import { ApiResponseDTO, apiServer } from "@/shared/api";
import type { TokenDTO } from "@/shared/api/auth";
import { isFetchError } from "@/shared/lib";
import { getServerTokens, removeServerTokens, setServerTokens } from "@/shared/lib/auth";

export async function POST() {
  const { accessToken, refreshToken } = await getServerTokens();

  if (!refreshToken || !accessToken) return NextResponse.error();

  const response = await apiServer.post<ApiResponseDTO<TokenDTO>>("/refresh", {
    body: { accessToken, refreshToken },
  });

  if (isFetchError(response)) {
    await removeServerTokens();
    return NextResponse.error();
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
  await setServerTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });

  return NextResponse.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
}
