import { useTranslations } from "next-intl";
import React from "react";
import ChangeName from "../(changeForms)/ChangeNameForm";
import styles from "./../personal-details.module.css";

const ChangeNameSection = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const t = useTranslations("PersonalDetailsPage");

  return (
    <section>
      <h3>{t("nameHeading")}</h3>
      <p className={styles.personalInfoText}>{firstName + " " + lastName}</p>
      <p>{t("nameDescription")}</p>
      <ChangeName
        text={t("changeNameButton")}
        passwordLabel={t("passwordLabel")}
        firstNameLabel={t("firstNameLabel")}
        lastNameLabel={t("lastNameLabel")}
        submitLabel={t("submitLabel")}
      />
    </section>
  );
};

export default ChangeNameSection;
