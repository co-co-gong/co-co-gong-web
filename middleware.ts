import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ApiResponseDTO, apiServer } from "@/shared/api";
import { TokenDTO } from "@/shared/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/shared/constants/storage";
import { isFetchError } from "@/shared/lib";
import { getServerTokens, isValidToken, removeServerTokens, setServerTokens } from "@/shared/lib/auth";

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

    if (!isAccessTokenValid) {
      const response = await apiServer.post<ApiResponseDTO<TokenDTO>>("/refresh", {
        body: { accessToken, refreshToken },
      });

      if (isFetchError(response)) {
        await removeServerTokens();
        return NextResponse.redirect(new URL("/auth", request.url));
      }

      await setServerTokens(response.data);

      const res = NextResponse.next();
      const reqCookies = request.cookies.getAll();

      res.cookies.set(ACCESS_TOKEN_KEY, response.data.accessToken);
      res.cookies.set(REFRESH_TOKEN_KEY, response.data.refreshToken);

      reqCookies.forEach((cookie) => {
        res.cookies.set(cookie.name, cookie.value);
      });

      return res;
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
