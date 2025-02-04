import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { setServerTokens } from "@/shared/lib/auth";

export async function POST(req: NextRequest) {
  const searchParams = new URLSearchParams(req.nextUrl.search);
  const [accessToken, refreshToken] = [searchParams.get("accessToken"), searchParams.get("refreshToken")];
  if (!accessToken || !refreshToken) return NextResponse.error();

  await setServerTokens({ accessToken, refreshToken });

  revalidateTag("users");

  return NextResponse.json({ accessToken, refreshToken });
}
