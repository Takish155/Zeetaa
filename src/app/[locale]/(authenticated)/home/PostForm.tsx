"use client";
import usePostForm from "@/_custon_hooks/user_actions/usePostForm";
import { useTranslations } from "next-intl";
import React from "react";

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
    <section className="post-form-section">
      <form onSubmit={handleSubmit((data) => postMutation.mutate(data))}>
        <section className="post-textarea">
          <textarea placeholder="Whats your mind?" {...register("post")} />
          {errors.post && (
            <p className="field-error">{t(errors.post?.message)}</p>
          )}
        </section>
        <section className="post-options">
          <select {...register("feedPrivacy")} value={"public"}>
            <option value="public">{publicText}</option>
            <option value="private">{privateText}</option>
          </select>
          <button type="submit" disabled={postMutation.isPending}>
            {submitText}
          </button>
        </section>
      </form>
    </section>
  );
};

export default PostForm;
