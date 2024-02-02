"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const LikePostButton = ({
  postId,
  likeCount,
}: {
  postId: string;
  likeCount: number;
}) => {
  const { likeMutation } = usePostButtonMutations();
  return (
    <button
      id="button-likes"
      onClick={() =>
        likeMutation.mutate({
          postId: postId.toString(),
        })
      }
      disabled={likeMutation.isPending}
    >
      <ThumbUpIcon /> {likeCount}
    </button>
  );
};

export default LikePostButton;
