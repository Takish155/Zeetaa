import React from "react";
import ErrorPage from "./Error";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { pick } from "lodash";

const page = () => {
  const message = useMessages();
  return (
    <div>
      <NextIntlClientProvider messages={pick(message, "Login")}>
        <ErrorPage />
      </NextIntlClientProvider>
    </div>
  );
};

export default page;
