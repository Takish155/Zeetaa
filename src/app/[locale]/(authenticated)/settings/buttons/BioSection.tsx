"use client";

import useUpdateBio from "@/_custon_hooks/settings_actions/useUpdateBio";
import { useTranslations } from "next-intl";
import React from "react";

const BioSection = ({ text }: { text: string }) => {
  const { errors, handleSubmit, loading, message, register, onSubmit } =
    useUpdateBio();
  const t = useTranslations("FieldError");

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
        <textarea {...register("bio")}></textarea>
        {errors.bio && <p className="field-error">{t(errors.bio.message)}</p>}
        <button type="submit" disabled={loading}>
          {text}
        </button>
      </form>
    </div>
  );
};

export default BioSection;
