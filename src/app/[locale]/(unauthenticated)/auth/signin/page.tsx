import SignInForm from "@/_component/auth/SignInForm";
import { pick } from "lodash";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();
  const locale = await getLocale();
  if (session) redirect(`/${locale}/home`);

  const t = await getTranslations("Login");
  const message = await getMessages();

  return (
    <main>
      <section>
        <h2>{t("header")}</h2>
        <p>{t("description")}</p>
        <NextIntlClientProvider messages={pick(message, "Login", "FieldError")}>
          <SignInForm />
        </NextIntlClientProvider>
      </section>
    </main>
  );
};

export default page;
