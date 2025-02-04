import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ApiResponseDTO, apiServer } from "@/shared/api";
import { TokenDTO } from "@/shared/api/auth";
import { isFetchError } from "@/shared/lib";
import { isValidToken } from "@/shared/lib/auth";
import { getServerTokens, removeServerTokens, setServerTokens } from "@/shared/models/auth";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith("/auth");

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    isAuthPage ||
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  const { accessToken, refreshToken } = await getServerTokens();

  if (!accessToken || !refreshToken) return NextResponse.redirect(new URL("/auth", request.url));

  try {
    const { isAccessTokenValid, isRefreshTokenValid } = isValidToken({
      accessToken,
      refreshToken,
    });

    if (!isRefreshTokenValid) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    if (isAccessTokenValid) {
      const response = await apiServer.post<ApiResponseDTO<TokenDTO>>("/refresh", {
        body: { accessToken, refreshToken },
      });

      if (isFetchError(response)) {
        await removeServerTokens();
        return NextResponse.redirect(new URL("/auth", request.url));
      }

      await setServerTokens(response.data);

      return NextResponse.next();
    }
  } catch {
    await removeServerTokens();
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)",
    "/",
  ],
};
