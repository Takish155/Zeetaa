"use client";

import useChangeUsername from "@/_custon_hooks/settings_actions/useChangeUsername";
import { useTranslations } from "next-intl";
import React, { useState, useTransition } from "react";

const ChangeUsername = ({
  text,
  usernameLabel,
  passwordLabel,
  submitLabel,
}: {
  text: string;
  usernameLabel: string;
  passwordLabel: string;
  submitLabel: string;
}) => {
  const [toggle, setToggle] = useState(false);
  const { register, handleSubmit, errors, message, mutation } =
    useChangeUsername();
  const t = useTranslations("FieldError");

  if (toggle) {
    return (
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        {message.message && <p>{message.message}</p>}
        <div>
          <label htmlFor="username">{usernameLabel}</label>
          <input type="text" {...register("newUsername")} />
          {errors.newUsername && <p>{t(errors.newUsername.message)}</p>}
        </div>
        <div>
          <label htmlFor="password">{passwordLabel}</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{t(errors.password.message)}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending}>
          {submitLabel}
        </button>
      </form>
    );
  }
  return <button onClick={() => setToggle(true)}>{text}</button>;
};

export default ChangeUsername;
