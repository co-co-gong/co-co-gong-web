import { NextRequest, NextResponse } from "next/server";

import type { TokenDTO } from "@/shared/api/auth";
import { getServerTokens, removeServerTokens, setServerTokens } from "@/shared/models/auth";

export async function GET() {
  const { accessToken, refreshToken } = await getServerTokens();
  return NextResponse.json({ accessToken, refreshToken });
}

export async function POST(request: NextRequest) {
  const { accessToken, refreshToken } = (await request.json()) as TokenDTO;
  await setServerTokens({ accessToken, refreshToken });
  return NextResponse.json({});
}

export async function DELETE() {
  await removeServerTokens();
  return NextResponse.json({});
}
