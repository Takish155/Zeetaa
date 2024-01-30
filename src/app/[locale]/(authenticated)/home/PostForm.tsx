"use client";
import usePostForm from "@/_custon_hooks/user_actions/usePostForm";
import { useTranslations } from "next-intl";
import React from "react";

const PostForm = ({
  submitText,
  publicText,
  privateText,
}: {
  submitText: string;
  publicText: string;
  privateText: string;
}) => {
  const { handleSubmit, errors, postMutation, register, message } =
    usePostForm();
  const t = useTranslations("FieldError");
  return (
    <form onSubmit={handleSubmit((data) => postMutation.mutate(data))}>
      <textarea {...register("post")} />
      {errors.post && <p>{t(errors.post?.message)}</p>}
      <select {...register("feedPrivacy")} value={"public"}>
        <option value="public">{publicText}</option>
        <option value="private">{privateText}</option>
      </select>
      <button type="submit" disabled={postMutation.isPending}>
        {submitText}
      </button>
    </form>
  );
};

export default PostForm;
