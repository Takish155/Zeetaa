"use client";

import useRegisterForm from "@/_custon_hooks/authentication/useRegisterForm";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const { register, errors, handleSubmit, message, onSubmit, loading } =
    useRegisterForm();
  const t = useTranslations("Register");
  const fieldErrorT = useTranslations("FieldError");
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      {message.message && <p>{message.message}</p>}
      <div>
        <label htmlFor="firstName">{t("firstName")}</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <p>{fieldErrorT(errors.firstName.message)}</p>}
      </div>
      <div>
        <label htmlFor="lastName">{t("lastName")}</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && <p>{fieldErrorT(errors.lastName.message)}</p>}
      </div>
      <div>
        <label htmlFor="username">{t("username")}</label>
        <input type="text" {...register("username")} />
        {errors.username && <p>{fieldErrorT(errors.username.message)}</p>}
      </div>
      <div>
        <label htmlFor="email">{t("email")}</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{fieldErrorT(errors.email.message)}</p>}
      </div>
      <div>
        <label htmlFor="password">{t("password")}</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{fieldErrorT(errors.password.message)}</p>}
      </div>
      <div>
        <label htmlFor="password">{t("confirmPassword")}</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p>{fieldErrorT(errors.confirmPassword.message)}</p>
        )}
      </div>
      <button type="submit" data-test="submit" disabled={loading}>
        {t("register")}
      </button>
    </form>
  );
};

export default SignUpForm;
