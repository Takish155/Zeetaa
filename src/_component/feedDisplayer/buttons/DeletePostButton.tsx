"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import deletePostAction from "@/app/api/actions/user/postActions/deletePostAction";
import React from "react";
import { useFormStatus } from "react-dom";

const DeletePostButton = ({
  deleteText,
  postId,
}: {
  deleteText: string;
  postId: string;
}) => {
  const { deleteMutation } = usePostButtonMutations();

  return (
    <button
      id="button-delete"
      onClick={() =>
        deleteMutation.mutate({
          postId: postId.toString(),
        })
      }
      disabled={deleteMutation.isPending}
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  );
};

export default DeletePostButton;
