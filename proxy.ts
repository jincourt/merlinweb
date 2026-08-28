import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, verifySessionToken } from "@/lib/admin-session";

const LOCALES = new Set(["fr", "en", "de"]);
const LOCALE_COOKIE = "INTLAYER_LOCALE";
const LOCALE_HEADER = "x-intlayer-locale";

function applyLocale(request: NextRequest) {
  const localeParam = request.nextUrl.searchParams.get("locale");
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    localeParam && LOCALES.has(localeParam)
      ? localeParam
      : cookieLocale && LOCALES.has(cookieLocale)
        ? cookieLocale
        : null;

  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (locale) {
    requestHeaders.set(LOCALE_HEADER, locale);
    response.headers.set(LOCALE_HEADER, locale);

    if (localeParam && localeParam === locale) {
      response.cookies.set(LOCALE_COOKIE, locale, { path: "/" });
    }
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = applyLocale(request);

  if (!pathname.startsWith("/admin")) {
    return response;
  }

  if (pathname === "/admin/login") {
    return response;
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifySessionToken(token))) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
  ],
};
