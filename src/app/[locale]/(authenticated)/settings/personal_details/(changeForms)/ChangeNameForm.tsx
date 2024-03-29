"use client";

import useChangeName from "@/_custon_hooks/settings_actions/useChangeName";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const ChangeName = ({
  text,
  firstNameLabel,
  lastNameLabel,
  passwordLabel,
  submitLabel,
}: {
  text: string;
  firstNameLabel: string;
  lastNameLabel: string;
  passwordLabel: string;
  submitLabel: string;
}) => {
  const [toggle, setToggle] = useState(false);
  const { errors, handleSubmit, message, mutation, register } = useChangeName();
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
          <label htmlFor="firstName">{firstNameLabel}</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && (
            <p className="field-error">{t(errors.firstName.message)}</p>
          )}
        </div>
        <div className="field-div">
          <label htmlFor="name">{lastNameLabel}</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && (
            <p className="field-error">{t(errors.lastName.message)}</p>
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

export default ChangeName;
