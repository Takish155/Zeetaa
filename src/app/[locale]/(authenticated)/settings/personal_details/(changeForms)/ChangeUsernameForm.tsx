"use client";

import useChangeUsername from "@/_custon_hooks/settings_actions/useChangeUsername";
import { CircularProgress } from "@mui/material";
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
          <label htmlFor="username">{usernameLabel}</label>
          <input type="text" {...register("newUsername")} />
          {errors.newUsername && (
            <p className="field-error">{t(errors.newUsername.message)}</p>
          )}
        </div>
        <div className="field-div">
          <label htmlFor="password">{passwordLabel}</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p className="field-error">{t(errors.password.message)}</p>
          )}
        </div>
        {!mutation.isPending ? (
          <button
            data-test="change-username-submit-button"
            type="submit"
            disabled={mutation.isPending}
          >
            {submitLabel}
          </button>
        ) : (
          <CircularProgress sx={{ margin: "0 2rem" }} />
        )}
      </form>
    );
  }
  return (
    <button data-test="change-username-button" onClick={() => setToggle(true)}>
      {text}
    </button>
  );
};

export default ChangeUsername;
