"use client";
import cancelSentFriendRequestAction from "@/app/api/actions/user/friendActions/cancelSentFriendRequestAction";
import React from "react";

const CancelSentFriendRequestActionButton = ({
  cancelButtonText,
  friendRequestId,
}: {
  cancelButtonText: string;
  friendRequestId: string;
}) => {
  return (
    <button onClick={() => cancelSentFriendRequestAction(friendRequestId)}>
      {cancelButtonText}
    </button>
  );
};

export default CancelSentFriendRequestActionButton;
