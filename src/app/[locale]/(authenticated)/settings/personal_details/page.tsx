import { getLocale, getMessages, getTranslations } from "next-intl/server";
import React from "react";
import ChangeUsernameSection from "./(sections)/ChangeUsernameSection";
import ChangeEmailSection from "./(sections)/ChangeEmailSection";
import ChangeNameSection from "./(sections)/ChangeNameSection";
import ChangePasswordSection from "./(sections)/ChangePasswordSection";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import styles from "./personal-details.module.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const locale = await getLocale();
  const session = await getServerSession();

  const userData = await getUserDataAction();
  const t = await getTranslations("PersonalDetailsPage");
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, "FieldError")}>
      {"status" in userData && userData.status === "error" ? (
        <p>{userData.message}</p>
      ) : (
        <section className={styles.personalDetails}>
          <h2>{t("personalDetailsHeading")}</h2>
          <ChangeUsernameSection
            username={"username" in userData ? userData?.username! : ""}
          />
          <ChangeEmailSection
            email={"email" in userData ? userData?.email! : ""}
          />
          <ChangeNameSection
            firstName={"firstName" in userData ? userData?.firstName! : ""}
            lastName={"lastName" in userData ? userData?.lastName! : ""}
          />
          <ChangePasswordSection />
        </section>
      )}
    </NextIntlClientProvider>
  );
};

export default page;
