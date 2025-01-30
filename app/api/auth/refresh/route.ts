import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { TokenDTO } from "@/shared/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { isFetchError } from "@/shared/lib";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;
  if (!refreshToken || !accessToken) return NextResponse.error();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, {
    method: "POST",
    body: JSON.stringify({ refreshToken, accessToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (isFetchError(response)) {
    cookieStore.delete(ACCESS_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_KEY);
    return NextResponse.error();
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } = (await response.json()) as TokenDTO;
  cookieStore.set(ACCESS_TOKEN_KEY, newAccessToken);
  cookieStore.set(REFRESH_TOKEN_KEY, newRefreshToken);

  return NextResponse.json({});
}
