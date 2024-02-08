"use client";

import usePostButtonMutations from "@/_custon_hooks/user_actions/usePostButtonMutations";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styles from "@/app/[locale]/(authenticated)/home/home-page.module.css";
import { CircularProgress } from "@mui/material";

const LikePostButton = ({
  postId,
  likeCount,
}: {
  postId: string;
  likeCount: number;
}) => {
  const { likeMutation } = usePostButtonMutations();
  return (
    <>
      {!likeMutation.isPending ? (
        <button
          className={styles.likeButton}
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
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default LikePostButton;
