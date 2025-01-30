import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
  if (!accessToken || !refreshToken) return NextResponse.error();

  cookieStore.set(ACCESS_TOKEN_KEY, accessToken);
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken);

  revalidateTag("users");

  return NextResponse.json({ accessToken, refreshToken });
}
