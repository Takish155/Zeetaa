"use client";

import { useTranslations } from "next-intl";
import React from "react";
import useLoginForm from "../../_custon_hooks/authentication/useLoginForm";

const SignInForm = ({ locale }: { locale: string }) => {
  const t = useTranslations("Login");
  const errorT = useTranslations("FieldError");
  const { handleSubmit, register, errors, message, loginMutation } =
    useLoginForm(locale);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        loginMutation.mutate({
          username: data.username,
          password: data.password,
        });
      })}
    >
      <h2>Sign-in to your account</h2>
      {message.message && (
        <p>
          {message.message === "credentialError"
            ? errorT("credentailFailedError")
            : t("loginSuccess")}
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
        <button
          style={{ marginRight: "1rem", marginBottom: "1rem" }}
          type="submit"
          data-test="submit"
          disabled={loginMutation.isPending}
        >
          {t("signIn")}
        </button>
        <button>
          <a href={`/${locale}/auth/signup`}>{t("signUp")}</a>
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
