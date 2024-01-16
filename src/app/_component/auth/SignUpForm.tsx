"use client";

import { useTranslations } from "next-intl";
import React from "react";
import useRegisterForm from "../../_custon_hooks/authentication/useRegisterForm";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const { register, errors, handleSubmit, message, onSubmit, loading } =
    useRegisterForm();
  const t = useTranslations("Register");
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <label htmlFor="firstName">{t("firstName")}</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label htmlFor="lastName">{t("lastName")}</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <label htmlFor="username">{t("username")}</label>
        <input type="text" {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="email">{t("email")}</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">{t("password")}</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="password">{t("confirmPassword")}</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit" disabled={loading}>
        {t("register")}
      </button>
    </form>
  );
};

export default SignUpForm;
