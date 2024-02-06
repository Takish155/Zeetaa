"use client";

import useRegisterForm from "@/_custon_hooks/authentication/useRegisterForm";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const { register, errors, handleSubmit, message, onSubmit, status } =
    useRegisterForm();
  const t = useTranslations("Register");
  const fieldErrorT = useTranslations("FieldError");
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
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
        <label htmlFor="firstName">{t("firstName")}</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && (
          <p className="field-error">{fieldErrorT(errors.firstName.message)}</p>
        )}
      </div>
      <div className="field-div">
        <label htmlFor="lastName">{t("lastName")}</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && (
          <p className="field-error">{fieldErrorT(errors.lastName.message)}</p>
        )}
      </div>
      <div className="field-div">
        <label htmlFor="username">{t("username")}</label>
        <input type="text" {...register("username")} />
        {errors.username && (
          <p className="field-error">{fieldErrorT(errors.username.message)}</p>
        )}
      </div>
      <div className="field-div">
        <label htmlFor="email">{t("email")}</label>
        <input type="email" {...register("email")} />
        {errors.email && (
          <p className="field-error">{fieldErrorT(errors.email.message)}</p>
        )}
      </div>
      <div className="field-div">
        <label htmlFor="password">{t("password")}</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className="field-error">{fieldErrorT(errors.password.message)}</p>
        )}
      </div>
      <div className="field-div">
        <label htmlFor="password">{t("confirmPassword")}</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="field-error">
            {fieldErrorT(errors.confirmPassword.message)}
          </p>
        )}
      </div>
      <div>
        <button
          type="submit"
          data-test="submit"
          disabled={status === "LOADING" ? true : false}
          style={{
            marginBottom: "1rem",
          }}
        >
          {t("register")}
        </button>
      </div>
      <button type="button" onClick={() => router.push("/")}>
        <Link href="/">{t("signIn")}</Link>
      </button>
    </form>
  );
};

export default SignUpForm;
