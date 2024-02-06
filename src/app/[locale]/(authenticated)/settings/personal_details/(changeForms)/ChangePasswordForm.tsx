"use client";

import useChangePassword from "@/_custon_hooks/settings_actions/useChangePassword";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const ChangePassword = ({
  text,
  submitLabel,
  confirmNewPasswordLabel,
  newPasswordLabel,
  oldPasswordLabel,
}: {
  text: string;
  submitLabel: string;
  oldPasswordLabel: string;
  newPasswordLabel: string;
  confirmNewPasswordLabel: string;
}) => {
  const [toggle, setToggle] = useState(false);
  const { errors, handleSubmit, message, mutation, register } =
    useChangePassword();
  const t = useTranslations("FieldError");

  if (toggle) {
    return (
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        {message.message && (
          <p
            className={
              message.status === "error"
                ? "server-message-error"
                : "server-message-success"
            }
          >
            {message.message}
          </p>
        )}
        <div className="field-div">
          <label htmlFor="oldPassword">{oldPasswordLabel}</label>
          <input type="password" {...register("oldPassword")} />
          {errors.oldPassword && (
            <p className="field-error">{t(errors.oldPassword.message)}</p>
          )}
        </div>
        <div className="field-div">
          <label htmlFor="newPassword">{newPasswordLabel}</label>
          <input type="password" {...register("newPassword")} />
          {errors.newPassword && (
            <p className="field-error">{t(errors.newPassword.message)}</p>
          )}
        </div>
        <div className="field-div">
          <label htmlFor="confirmNewPassword">{confirmNewPasswordLabel}</label>
          <input type="password" {...register("confirmNewPassword")} />
          {errors.confirmNewPassword && (
            <p className="field-error">
              {t(errors.confirmNewPassword.message)}
            </p>
          )}
        </div>
        <button type="submit">{submitLabel}</button>
      </form>
    );
  }
  return <button onClick={() => setToggle(true)}>{text}</button>;
};

export default ChangePassword;
