import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ja"],

  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/auth": "/auth",
  },
});

export const config = {
  matcher: ["/", "/(ja|en)/:path*"],
};
