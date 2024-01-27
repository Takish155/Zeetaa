import { useTranslations } from "next-intl";
import React from "react";
import ChangeEmail from "../(changeForms)/ChangeEmailForm";

const ChangeEmailSection = ({ email }: { email: string }) => {
  const t = useTranslations("PersonalDetailsPage");
  return (
    <section>
      <h3>{t("emailHeading")}</h3>
      <p>{t("emailDescription")}</p>
      <p>{email}</p>
      <ChangeEmail
        text={t("changeEmailButton")}
        passwordLabel={t("passwordLabel")}
        emailLabel={t("emailLabel")}
        submitLabel={t("submitLabel")}
      />
    </section>
  );
};

export default ChangeEmailSection;
