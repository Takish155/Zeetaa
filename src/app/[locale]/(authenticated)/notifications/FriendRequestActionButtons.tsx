"use client";
import useFriendRequestActionButtons from "@/_custon_hooks/user_actions/useFriendRequestActionButtons";
import Link from "next/link";
import React from "react";

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
    <div>
      {message.action === "rejectFriendRequest" ? (
        <p>{message.message}</p>
      ) : message.action === "acceptFriendRequest" ? (
        <p>{message.message}</p>
      ) : (
        <>
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
          <button
            disabled={rejectFriendRequestMutation.isPending}
            onClick={() =>
              rejectFriendRequestMutation.mutate({ friendRequestId })
            }
          >
            {rejectText}
          </button>
          <button>
            <Link href={`/${locale}/profile/${username}`}>
              {viewProfileText}
            </Link>
          </button>
        </>
      )}
    </div>
  );
};

export default FriendRequestActionButtons;
