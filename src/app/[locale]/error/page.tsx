import React from "react";
import ErrorPage from "./Error";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import { getMessages } from "next-intl/server";

const page = async () => {
  const message = await getMessages();
  return (
    <div>
      <NextIntlClientProvider messages={pick(message, "Login")}>
        <ErrorPage />
      </NextIntlClientProvider>
    </div>
  );
};

export default page;
