import React from "react";
import ChangeUsername from "../(changeForms)/ChangeUsernameForm";
import { useTranslations } from "next-intl";

const ChangeUsernameSection = ({ username }: { username: string }) => {
  const t = useTranslations("PersonalDetailsPage");

  return (
    <section>
      <h3>{t("usernameHeading")}</h3>
      <p>{t("usernameDescription")}</p>
      <p>{username}</p>
      <ChangeUsername
        text={t("changeUsernameButton")}
        passwordLabel={t("passwordLabel")}
        usernameLabel={t("usernameLabel")}
        submitLabel={t("submitLabel")}
      />
    </section>
  );
};

export default ChangeUsernameSection;
