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
      <nav>
        <ul>{session && <SessionHeader locale={locale} />}</ul>
      </nav>
    </header>
  );
};

export default Header;
