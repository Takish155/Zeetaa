"use client";

import useChangeEmail from "@/_custon_hooks/settings_actions/useChangeEmail";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const ChangeEmail = ({
  text,
  emailLabel,
  passwordLabel,
  submitLabel,
}: {
  text: string;
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
}) => {
  const [toggle, setToggle] = useState(false);
  const { register, handleSubmit, errors, message, mutation } =
    useChangeEmail();
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
          <label htmlFor="email">{emailLabel}</label>
          <input type="email" {...register("newEmail")} />
          {errors.newEmail && (
            <p className="field-error">{t(errors.newEmail.message)}</p>
          )}
        </div>
        <div className="field-div">
          <label htmlFor="password">{passwordLabel}</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p className="field-error">{t(errors.password.message)}</p>
          )}
        </div>
        <button type="submit">{submitLabel}</button>
      </form>
    );
  }
  return <button onClick={() => setToggle(true)}>{text}</button>;
};

export default ChangeEmail;
