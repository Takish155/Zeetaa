"use client";

import removeFromFriendListAction from "@/app/api/actions/user/friendActions/removeFromFriendListAction";
import React from "react";
import styles from "./friends-page.module.css";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.profilebutton}
        onClick={() => router.push(`/${locale}/profile/${username}`)}
      >
        {visitProfileText}
      </button>
      <button
        className={styles.messagebutton}
        onClick={() => router.push(`/${locale}/messages/${username}`)}
      >
        {messageText}
      </button>
      <button
        className={styles.removefriendbutton}
        onClick={() => removeFromFriendListAction(friendListId)}
      >
        {removeFriendText}
      </button>
    </div>
  );
};

export default FriendActionButton;
