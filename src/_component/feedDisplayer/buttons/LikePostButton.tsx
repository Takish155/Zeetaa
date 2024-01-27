"use client";

import likePostAction from "@/app/api/actions/user/postActions/likePostAction";
import React from "react";

const LikePostButton = ({
  likeText,
  postId,
  likeCount,
}: {
  likeText: string;
  postId: string;
  likeCount: number;
}) => {
  return (
    <button
      onClick={async () => {
        const response = await likePostAction(postId);
        console.log(response);
      }}
    >
      {likeCount} {likeText}
    </button>
  );
};

export default LikePostButton;
