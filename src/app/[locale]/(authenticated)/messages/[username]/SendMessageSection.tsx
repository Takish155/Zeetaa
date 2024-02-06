"use client";

import { useOptimisticChatContext } from "@/_context/OptimisitcChatProvider";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./chat-page.module.css";

const SendMessageSection = ({ sendButtonText }: { sendButtonText: string }) => {
  const t = useTranslations("FieldError");
  const context = useOptimisticChatContext();
  if (!context) return null;
  const { mutation, handleSubmit, register, errors } = context;

  return (
    <section className={styles.messageSection}>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <textarea {...register("message")} unselectable="on" />
        <button type="submit">{sendButtonText}</button>
        {errors.message && (
          <p className="field-error">{t(errors.message?.message)}</p>
        )}
      </form>
    </section>
  );
};

export default SendMessageSection;
