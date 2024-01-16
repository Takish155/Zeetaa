"use client";
import usePostForm from "@/app/_custon_hooks/user_actions/usePostForm";
import React, { useState } from "react";

const PostForm = ({ submitText }: { submitText: string }) => {
  const { onSubmit, message, post, setPost, feedPrivacy, setFeedPrivacy } =
    usePostForm();
  return (
    <form onSubmit={(e) => onSubmit(e, post, feedPrivacy)}>
      {message && <p>{message.message}</p>}
      <textarea onChange={(e) => setPost(e.target.value)} value={post} />
      <select
        defaultValue={feedPrivacy}
        value={feedPrivacy}
        onChange={(e) => setFeedPrivacy(e.target.value as "public" | "private")}
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button type="submit" onSubmit={() => setPost("")}>
        {submitText}
      </button>
    </form>
  );
};

export default PostForm;
