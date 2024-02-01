"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import React from "react";

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
      <i className="fa-regular fa-thumbs-up"></i> {likeCount}
    </button>
  );
};

export default LikePostButton;
