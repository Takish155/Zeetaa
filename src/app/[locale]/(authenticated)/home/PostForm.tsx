"use client";
import usePostForm from "@/_custon_hooks/user_actions/usePostForm";
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
  const { onSubmit, message, post, setPost, feedPrivacy, setFeedPrivacy } =
    usePostForm();
  return (
    <form onSubmit={(e) => onSubmit(e, post, feedPrivacy)}>
      {message && <p>{message.message}</p>}
      <textarea onChange={(e) => setPost(e.target.value)} value={post} />
      <select
        value={feedPrivacy}
        onChange={(e) => setFeedPrivacy(e.target.value as "public" | "private")}
      >
        <option value="public">{publicText}</option>
        <option value="private">{privateText}</option>
      </select>
      <button type="submit" onSubmit={() => setPost("")}>
        {submitText}
      </button>
    </form>
  );
};

export default PostForm;
