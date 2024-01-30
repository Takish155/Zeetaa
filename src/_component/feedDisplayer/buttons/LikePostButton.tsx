"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import likePostAction from "@/app/api/actions/user/postActions/likePostAction";
import React from "react";
import { useFormStatus } from "react-dom";

const LikePostButton = ({
  likeText,
  postId,
  likeCount,
}: {
  likeText: string;
  postId: string;
  likeCount: number;
}) => {
  const { likeMutation } = usePostButtonMutations();
  return (
    <button
      onClick={() =>
        likeMutation.mutate({
          postId: postId.toString(),
        })
      }
      disabled={likeMutation.isPending}
    >
      {likeCount} {likeText}
    </button>
  );
};

export default LikePostButton;
