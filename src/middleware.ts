import { getServerSession } from "next-auth";
import createMiddleware from "next-intl/middleware";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "jp"],

  // Used when no locale matches
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/auth": "/auth",
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(jp|en)/:path*"],
};
