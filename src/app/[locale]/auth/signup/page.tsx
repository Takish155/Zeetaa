import SignUpForm from "@/app/_component/auth/SignUpForm";
import { pick } from "lodash/";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import React from "react";

const page = () => {
  const t = useTranslations("Register");
  const message = useMessages();
  return (
    <main>
      <section>
        <h2>{t("header")}</h2>
        <p>{t("description")}</p>
        <NextIntlClientProvider messages={pick(message, "Register")}>
          <SignUpForm />
        </NextIntlClientProvider>
      </section>
    </main>
  );
};

export default page;
