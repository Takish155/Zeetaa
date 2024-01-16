import SignInForm from "@/app/_component/auth/SignInForm";
import { pick } from "lodash";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import React from "react";

const page = () => {
  const t = useTranslations("Login");
  const message = useMessages();
  return (
    <main>
      <section>
        <h2>{t("header")}</h2>
        <p>{t("description")}</p>
        <NextIntlClientProvider messages={pick(message, "Login")}>
          <SignInForm />
        </NextIntlClientProvider>
      </section>
    </main>
  );
};

export default page;
