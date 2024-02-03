import React from "react";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import SessionHeader from "./SessionHeader";

const HamburgerHeader = async () => {
  const t = await getTranslations("Header");
  const session = await getServerSession();
  const locale = await getLocale();

  if (session) {
    return (
      <header className="session-header">
        <nav>
          <ul>
            <SessionHeader locale={locale} />
          </ul>
        </nav>
      </header>
    );
  }
};

export default HamburgerHeader;
