import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import SessionHeader from "./SessionHeader";
import SearchUser from "./SearchUser";

const Header = async () => {
  const t = await getTranslations("Header");
  const session = await getServerSession();
  const locale = await getLocale();

  return (
    <header>
      <h1>{t("header")}</h1>
      <nav>
        <ul>
          {session ? (
            <SessionHeader locale={locale} />
          ) : (
            <>
              <li>
                <Link href="/">{t("home")}</Link>
              </li>
              <li>
                <Link data-test="login-nav" href={`/${locale}/auth/signin`}>
                  {t("login")}
                </Link>
              </li>
              <li>
                <Link data-test="register-nav" href={`/${locale}/auth/signup`}>
                  {t("register")}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <SearchUser locale={locale} />
    </header>
  );
};

export default Header;
