import SignInForm from "@/_component/auth/SignInForm";
import { pick } from "lodash";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";
import styles from "./../auth.module.css";

const page = async () => {
  const session = await getServerSession();
  const locale = await getLocale();
  if (session) redirect(`/${locale}/home`);
  const message = await getMessages();

  return (
    <main className={styles.authSignin}>
      <section>
        <NextIntlClientProvider messages={pick(message, "Login", "FieldError")}>
          <SignInForm locale={locale} />
        </NextIntlClientProvider>
      </section>
    </main>
  );
};

export default page;
