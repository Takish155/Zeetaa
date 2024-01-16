"use client";

import likePostAction from "@/app/api/actions/user/postActions/likePostAction";
import React from "react";

const LikePostButton = ({
  likeText,
  postId,
}: {
  likeText: string;
  postId: string;
}) => {
  return (
    <button
      onClick={async () => {
        const response = await likePostAction(postId);
        console.log(response);
      }}
    >
      {likeText}
    </button>
  );
};

export default LikePostButton;
