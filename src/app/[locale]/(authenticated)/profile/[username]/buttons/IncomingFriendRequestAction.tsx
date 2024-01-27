"use client";

import acceptFriendRequestAction from "@/app/api/actions/user/friendActions/acceptFriendRequestAction";
import rejectFriendRequestAction from "@/app/api/actions/user/friendActions/rejectFriendRequestAction";
import React from "react";

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
      <button onClick={() => acceptFriendRequestAction(friendRequestId)}>
        {acceptText}
      </button>
      <button onClick={() => rejectFriendRequestAction(friendRequestId)}>
        {rejectText}
      </button>
    </>
  );
};

export default IncomingFriendRequestAction;
