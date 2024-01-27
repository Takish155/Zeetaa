import React from "react";
import DeleteAccountButton from "./buttons/DeleteAccountButton";
import SignOutButton from "./buttons/SignOutButton";
import BioSection from "./buttons/BioSection";
import { getTranslations } from "next-intl/server";

const page = async () => {
  const t = await getTranslations("SettingsPage");
  return (
    <article>
      <section>
        <h2>{t("bioHeading")}</h2>
        <p>{t("bioDescription")}</p>
        <BioSection text={t("saveButton")} />
      </section>
      <section>
        <h2>{t("signOutHeading")}</h2>
        <p>{t("signOutDescription")}</p>
        <SignOutButton text={t("signOutHeading")} />
      </section>
      <section>
        <h2>{t("deleteAccountHeading")}</h2>
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
