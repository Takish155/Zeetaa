"use client";

import { useOptimisticChatContext } from "@/_context/OptimisitcChatProvider";
import { useTranslations } from "next-intl";
import React from "react";

const SendMessageSection = ({ sendButtonText }: { sendButtonText: string }) => {
  const t = useTranslations("FieldError");
  const context = useOptimisticChatContext();
  if (!context) return null;
  const { mutation, handleSubmit, register, errors } = context;

  return (
    <section>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <textarea {...register("message")}></textarea>
        {errors.message && <p>{t(errors.message?.message)}</p>}
        <button type="submit">{sendButtonText}</button>
      </form>
    </section>
  );
};

export default SendMessageSection;
