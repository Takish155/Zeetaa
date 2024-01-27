import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { pick } from "lodash";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInForm from "@/_component/auth/SignInForm";

const page = async () => {
  const session = await getServerSession();
  const locale = await getLocale();
  if (session) redirect(`/${locale}/home`);

  const t = await getTranslations("Index");
  const message = await getMessages();

  return (
    <main>
      <section>
        <h1>{t("header")}</h1>
        <p>{t("description")}</p>
      </section>
      <section>
        <h2>Sign-in to your account</h2>
        <NextIntlClientProvider messages={pick(message, "Login")}>
          <SignInForm />
        </NextIntlClientProvider>
      </section>
    </main>
  );
};

export default page;
