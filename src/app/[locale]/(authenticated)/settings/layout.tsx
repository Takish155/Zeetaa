import { getMessages, getTranslations } from "next-intl/server";
import React, { ReactNode } from "react";
import styles from "./settings.module.css";
import type { Viewport } from "next";
import SettingsNav from "@/_component/pageHeaders/settingsNav";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const t = await getTranslations("SettingsPage");
  const messages = await getMessages();

  return (
    <main className={styles.settingMain}>
      <div className={styles.settingContainer}>{children}</div>
      <div className={styles.navContainer}>
        <h2>{t("header")}</h2>
        <NextIntlClientProvider messages={pick(messages, "SettingsPage")}>
          <SettingsNav locale={params.locale} />
        </NextIntlClientProvider>
      </div>
    </main>
  );
};

export const viewport: Viewport = {
  userScalable: false,
};

export default layout;
