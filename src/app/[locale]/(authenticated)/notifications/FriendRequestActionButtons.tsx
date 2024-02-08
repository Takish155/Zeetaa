"use client";
import useFriendRequestActionButtons from "@/_custon_hooks/user_actions/useFriendRequestActionButtons";
import Link from "next/link";
import React from "react";
import styles from "./notifications.module.css";
import { CircularProgress } from "@mui/material";

const FriendRequestActionButtons = ({
  acceptText,
  rejectText,
  locale,
  username,
  viewProfileText,
  friendRequestId,
}: {
  acceptText: string;
  rejectText: string;
  username: string;
  locale: string;
  viewProfileText: string;
  friendRequestId: string;
}) => {
  const { message, acceptFriendRequestMutation, rejectFriendRequestMutation } =
    useFriendRequestActionButtons();

  return (
    <div className={styles.friendActionButtonContainer}>
      {message.action === "rejectFriendRequest" ? (
        <p>{message.message}</p>
      ) : message.action === "acceptFriendRequest" ? (
        <p>{message.message}</p>
      ) : (
        <>
          {!rejectFriendRequestMutation.isPending &&
          !acceptFriendRequestMutation.isPending ? (
            <button
              disabled={acceptFriendRequestMutation.isPending}
              onClick={() =>
                acceptFriendRequestMutation.mutate({
                  friendRequestId,
                })
              }
            >
              {acceptText}
            </button>
          ) : (
            <CircularProgress sx={{ margin: "0 2rem" }} />
          )}
          {!acceptFriendRequestMutation.isPending &&
          !rejectFriendRequestMutation.isPending ? (
            <button
              disabled={rejectFriendRequestMutation.isPending}
              onClick={() =>
                rejectFriendRequestMutation.mutate({ friendRequestId })
              }
            >
              {rejectText}
            </button>
          ) : (
            <CircularProgress sx={{ margin: "0 2rem" }} />
          )}
          <button>
            <Link passHref href={`/${locale}/profile/${username}`}>
              {viewProfileText}
            </Link>
          </button>
        </>
      )}
    </div>
  );
};

export default FriendRequestActionButtons;
