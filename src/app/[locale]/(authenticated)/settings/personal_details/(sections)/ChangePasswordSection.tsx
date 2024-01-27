import { useTranslations } from "next-intl";
import React from "react";
import ChangePassword from "../(changeForms)/ChangePasswordForm";

const ChangePasswordSection = () => {
  const t = useTranslations("PersonalDetailsPage");
  return (
    <section>
      <h3>{t("passwordHeading")}</h3>
      <p>{t("passwordDescription")}</p>
      <ChangePassword
        confirmNewPasswordLabel={t("confirmNewPasswordLabel")}
        newPasswordLabel={t("newPasswordLabel")}
        oldPasswordLabel={t("oldPasswordLabel")}
        submitLabel={t("submitLabel")}
        text={t("changePasswordButton")}
      />
    </section>
  );
};

export default ChangePasswordSection;
