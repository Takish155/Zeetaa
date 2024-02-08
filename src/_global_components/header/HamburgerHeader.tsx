import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import SessionHeader from "./SessionHeader";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";
import { CircularProgress } from "@mui/material";

const HamburgerHeader = async () => {
  const t = await getTranslations("Header");
  const session = await getServerSession();
  const locale = await getLocale();
  const messages = await getMessages();
  const userData = await getUserDataAction();

  if (session) {
    return (
      <header className="session-header">
        <nav>
          <ul>
            <NextIntlClientProvider messages={pick(messages, "Header")}>
              <Suspense fallback={<CircularProgress />}>
                <SessionHeader
                  locale={locale}
                  username={"username" in userData ? userData.username! : ""}
                />
              </Suspense>
            </NextIntlClientProvider>
          </ul>
        </nav>
      </header>
    );
  }
};

export default HamburgerHeader;
