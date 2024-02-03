"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "@/app/[locale]/(authenticated)/home/home-page.module.css";

const DeletePostButton = ({ postId }: { postId: string }) => {
  const { deleteMutation } = usePostButtonMutations();

  return (
    <button
      id="button-delete"
      className={styles.deleteButton}
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
