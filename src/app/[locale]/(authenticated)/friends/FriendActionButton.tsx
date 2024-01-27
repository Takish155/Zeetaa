"use client";

import removeFromFriendListAction from "@/app/api/actions/user/friendActions/removeFromFriendListAction";
import Link from "next/link";
import React from "react";

const FriendActionButton = ({
  visitProfileText,
  removeFriendText,
  messageText,
  friendListId,
  locale,
  username,
}: {
  visitProfileText: string;
  removeFriendText: string;
  messageText: string;
  friendListId: string;
  locale: string;
  username: string;
}) => {
  return (
    <>
      <button>
        <Link href={`/${locale}/profile/${username}`}>{visitProfileText}</Link>
      </button>
      <button onClick={() => removeFromFriendListAction(friendListId)}>
        {removeFriendText}
      </button>
      <button>
        <Link href={`/${locale}/messages/${username}`}>{messageText}</Link>
      </button>
    </>
  );
};

export default FriendActionButton;
