import { useTranslations } from "next-intl";
import React from "react";
import ChangeName from "../(changeForms)/ChangeNameForm";

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
      <p>{t("nameDescription")}</p>
      <p>{firstName + " " + lastName}</p>
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
