"use client";

import acceptFriendRequestAction from "@/app/api/actions/user/friendActions/acceptFriendRequestAction";
import rejectFriendRequestAction from "@/app/api/actions/user/friendActions/rejectFriendRequestAction";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import styles from "../profile-style.module.css";

const IncomingFriendRequestAction = ({
  acceptText,
  rejectText,
  friendRequestId,
}: {
  acceptText: string;
  rejectText: string;
  friendRequestId: string;
}) => {
  return (
    <>
      <button
        onClick={() => acceptFriendRequestAction(friendRequestId)}
        className={styles.acceptButton}
      >
        <CheckIcon />
        {acceptText}
      </button>
      <button
        onClick={() => rejectFriendRequestAction(friendRequestId)}
        className={styles.declineButton}
      >
        <NotInterestedIcon />
        {rejectText}
      </button>
    </>
  );
};

export default IncomingFriendRequestAction;
