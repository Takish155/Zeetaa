import React from "react";
import ChangeUsername from "../(changeForms)/ChangeUsernameForm";
import { useTranslations } from "next-intl";
import styles from "./../personal-details.module.css";

const ChangeUsernameSection = ({ username }: { username: string }) => {
  const t = useTranslations("PersonalDetailsPage");

  return (
    <section>
      <h3>{t("usernameHeading")}</h3>
      <p data-test="detail-username" className={styles.personalInfoText}>
        {username}
      </p>
      <p>{t("usernameDescription")}</p>
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
