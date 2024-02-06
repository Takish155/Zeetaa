"use client";

import removeFromFriendListAction from "@/app/api/actions/user/friendActions/removeFromFriendListAction";
import React from "react";
import styles from "./../profile-style.module.css";

const RemoveActionButton = ({
  removeText,
  friendId,
}: {
  removeText: string;
  friendId: string;
}) => {
  return (
    <button
      className={styles.declineButton}
      onClick={() => removeFromFriendListAction(friendId)}
    >
      {removeText}
    </button>
  );
};

export default RemoveActionButton;
