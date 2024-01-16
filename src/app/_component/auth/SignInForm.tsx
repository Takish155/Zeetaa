"use client";

import { useTranslations } from "next-intl";
import React from "react";
import useLoginForm from "../../_custon_hooks/authentication/useLoginForm";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SignInForm = () => {
  const t = useTranslations("Login");
  const { handleSubmit, register, errors, message, onSubmit } = useLoginForm();
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      {errorMessage && <p>{errorMessage}!</p>}
      <div>
        <label htmlFor="username">{t("username")}</label>
        <input type="text" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="password">{t("password")}</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">{t("signIn")}</button>
    </form>
  );
};

export default SignInForm;
