import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import SessionHeader from "./SessionHeader";
import logo from "@/../public/images/logo.png";
import Image from "next/image";

const Header = async () => {
  const t = await getTranslations("Header");
  const session = await getServerSession();
  const locale = await getLocale();

  if (session) {
    return (
      <header>
        <h1>
          <Image
            src={logo}
            alt="logo of zeetaa"
            style={{
              width: "40%",
              height: "auto",
              marginLeft: "1rem",
              marginTop: "2rem",
            }}
          />
        </h1>
        <nav>
          <ul>
            <SessionHeader locale={locale} />
          </ul>
        </nav>
      </header>
    );
  }
};

export default Header;
