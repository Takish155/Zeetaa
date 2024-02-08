"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "@/app/[locale]/(authenticated)/home/home-page.module.css";
import { CircularProgress } from "@mui/material";

const DeletePostButton = ({ postId }: { postId: string }) => {
  const { deleteMutation } = usePostButtonMutations();

  return (
    <>
      {!deleteMutation.isPending ? (
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
      ) : (
        <CircularProgress sx={{ margin: "0 2rem" }} />
      )}
    </>
  );
};

export default DeletePostButton;
