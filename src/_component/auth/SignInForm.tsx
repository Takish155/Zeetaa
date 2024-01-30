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
      {message.message && (
        <p>
          {message.message === "credentialError"
            ? errorT("credentailFailedError")
            : t("loginSuccess")}
        </p>
      )}
      <div>
        <label htmlFor="username">{t("username")}</label>
        <input type="text" {...register("username")} />
        {errors.username && <p>{errorT("invalidUsernameError")}</p>}
      </div>
      <div>
        <label htmlFor="password">{t("password")}</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errorT("invalidPasswordError")}</p>}
      </div>
      <button
        type="submit"
        data-test="submit"
        disabled={loginMutation.isPending}
      >
        {t("signIn")}
      </button>
    </form>
  );
};

export default SignInForm;
