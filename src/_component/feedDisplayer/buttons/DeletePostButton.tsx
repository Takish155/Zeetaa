"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const DeletePostButton = ({ postId }: { postId: string }) => {
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
      <DeleteIcon />
    </button>
  );
};

export default DeletePostButton;
