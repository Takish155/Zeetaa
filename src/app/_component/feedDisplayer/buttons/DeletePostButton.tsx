"use client";

import deletePostAction from "@/app/api/actions/user/postActions/deletePostAction";
import React from "react";

const DeletePostButton = ({
  deleteText,
  postId,
}: {
  deleteText: string;
  postId: string;
}) => {
  return (
    <button
      onClick={async () => {
        deletePostAction(postId);
      }}
    >
      {deleteText}
    </button>
  );
};

export default DeletePostButton;
