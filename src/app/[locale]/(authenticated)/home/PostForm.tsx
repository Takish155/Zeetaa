"use client";
import usePostForm from "@/_custon_hooks/user_actions/usePostForm";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./home-page.module.css";
import { CircularProgress } from "@mui/material";

const PostForm = ({
  submitText,
  placeholder,
  publicText,
  privateText,
}: {
  submitText: string;
  publicText: string;
  placeholder: string;
  privateText: string;
}) => {
  const { handleSubmit, errors, postMutation, register, message } =
    usePostForm();
  const t = useTranslations("FieldError");
  return (
    <section className={styles.postFormSection}>
      <form onSubmit={handleSubmit((data) => postMutation.mutate(data))}>
        <section className={styles.postTextarea}>
          <textarea placeholder="Whats your mind?" {...register("post")} />
          {errors.post && (
            <p className="field-error">{t(errors.post?.message)}</p>
          )}
        </section>
        <section className={styles.postOptions}>
          <select {...register("feedPrivacy")}>
            <option value="public">{publicText}</option>
            <option value="private">{privateText}</option>
          </select>
          {!postMutation.isPending ? (
            <button type="submit" disabled={postMutation.isPending}>
              {submitText}
            </button>
          ) : (
            <CircularProgress />
          )}
        </section>
      </form>
    </section>
  );
};

export default PostForm;
