import Image from "next/image";
import React, { Suspense } from "react";
import logo from "@/../public/images/logo.png";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import SearchInput from "./SearchInput";

const Header = () => {
  const t = useTranslations("Header");
  const locale = useLocale();

  return (
    <header className="main-header">
      <h1>
        <Link href="/">
          <Image src={logo} alt="logo of zeetaa" />
        </Link>
      </h1>
      <Suspense fallback="loading">
        <SearchInput placeholder={t("search")} locale={locale} />
      </Suspense>
    </header>
  );
};

export default Header;
