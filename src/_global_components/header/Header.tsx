import Image from "next/image";
import React, { Suspense } from "react";
import logo from "@/../public/images/logo.png";

import Link from "next/link";
import SearchInput from "./SearchInput";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { CircularProgress } from "@mui/material";

const Header = async () => {
  const t = await getTranslations("Header");
  const locale = await getLocale();
  const session = await getServerSession();

  return (
    <header className="main-header">
      <h1>
        <Link passHref href="/">
          <Image src={logo} alt="logo of zeetaa" />
        </Link>
      </h1>
      {session && (
        <Suspense fallback={<CircularProgress sx={{ margin: "0 2rem" }} />}>
          <SearchInput placeholder={t("search")} locale={locale} />
        </Suspense>
      )}
    </header>
  );
};

export default Header;
