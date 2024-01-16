import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import React from "react";
import SignInForm from "../_component/auth/SignInForm";
import { pick } from "lodash";

const page = () => {
  const t = useTranslations("Index");
  const message = useMessages();

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
