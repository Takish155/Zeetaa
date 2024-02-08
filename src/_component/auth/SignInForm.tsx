"use client";

import { useTranslations } from "next-intl";
import React from "react";
import useLoginForm from "../../_custon_hooks/authentication/useLoginForm";
import styles from "./../../app/[locale]/(unauthenticated)/auth/auth.module.css";
import { CircularProgress } from "@mui/material";

const SignInForm = ({ locale }: { locale: string }) => {
  const t = useTranslations("Login");
  const errorT = useTranslations("FieldError");

  const { handleSubmit, register, errors, message, loginMutation } =
    useLoginForm(locale);

  return (
    <form
      className={styles.formSection}
      onSubmit={handleSubmit((data) => {
        loginMutation.mutate({
          username: data.username,
          password: data.password,
        });
      })}
    >
      <h2>{t("header")}</h2>
      {message.status === "error" && (
        <p className="server-message-error" style={{ marginBottom: "1rem" }}>
          {errorT("credentailFailedError")}
        </p>
      )}
      <div className="field-div">
        <label htmlFor="username">{t("username")}</label>
        <input type="text" {...register("username")} />
        {errors.username && (
          <p className="field-error">{errorT("invalidUsernameError")}</p>
        )}
      </div>
      <div className="field-div">
        <label htmlFor="password">{t("password")}</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className="field-error">{errorT("invalidPasswordError")}</p>
        )}
      </div>
      <div>
        {!loginMutation.isPending ? (
          <button
            style={{ marginRight: "1rem", marginBottom: "1rem" }}
            type="submit"
            data-test="submit"
            disabled={loginMutation.isPending}
          >
            {t("signIn")}
          </button>
        ) : (
          <CircularProgress />
        )}
        <a href={`/${locale}/auth/signup`}>
          <button type="button">{t("signUp")}</button>
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
