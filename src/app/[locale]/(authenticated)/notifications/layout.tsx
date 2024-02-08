import { getMessages, getTranslations } from "next-intl/server";
import React, { ReactNode } from "react";
import styles from "./notifications.module.css";
import NotificationNav from "@/_component/pageHeaders/notificationNav";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const messages = await getMessages();
  const t = await getTranslations("NotificationPage");
  return (
    <main className={styles.notificationMain}>
      <section className={styles.notificationSection}>{children}</section>
      <div className={styles.notificationContainer}>
        <h2>{t("header")}</h2>
        <NextIntlClientProvider messages={pick(messages, "NotificationPage")}>
          <NotificationNav locale={params.locale} />
        </NextIntlClientProvider>
      </div>
    </main>
  );
};

export default layout;
