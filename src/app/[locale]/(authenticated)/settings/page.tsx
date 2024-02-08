import React from "react";
import DeleteAccountButton from "./buttons/DeleteAccountButton";
import SignOutButton from "./buttons/SignOutButton";
import BioSection from "./buttons/BioSection";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import styles from "./settings.module.css";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const locale = await getLocale();
  const session = await getServerSession();

  const t = await getTranslations("SettingsPage");
  const messages = await getMessages();
  return (
    <article className={styles.settingSection}>
      <section>
        <h3>{t("bioHeading")}</h3>
        <p>{t("bioDescription")}</p>
        <NextIntlClientProvider messages={pick(messages, "FieldError")}>
          <BioSection text={t("saveButton")} />
        </NextIntlClientProvider>
      </section>
      <section>
        <h3>{t("signOutHeading")}</h3>
        <p>{t("signOutDescription")}</p>
        <SignOutButton text={t("signOutHeading")} />
      </section>
      <section>
        <h3>{t("deleteAccountHeading")}</h3>
        <p>{t("deleteAccountDescription")}</p>
        <DeleteAccountButton
          text={t("deleteAccountHeading")}
          confirmationText={t("confirmAccountDeletion")}
          invalidPasswordText={t("invalidPassword")}
        />
      </section>
    </article>
  );
};

export default page;
