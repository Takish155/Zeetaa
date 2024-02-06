import { useTranslations } from "next-intl";
import React from "react";
import ChangeEmail from "../(changeForms)/ChangeEmailForm";
import styles from "./../personal-details.module.css";

const ChangeEmailSection = ({ email }: { email: string }) => {
  const t = useTranslations("PersonalDetailsPage");
  return (
    <section>
      <h3>{t("emailHeading")}</h3>
      <p className={styles.personalInfoText}>{email}</p>
      <p>{t("emailDescription")}</p>
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
