"use client";

import removeFromFriendListAction from "@/app/api/actions/user/friendActions/removeFromFriendListAction";
import React from "react";

const RemoveActionButton = ({
  removeText,
  friendId,
}: {
  removeText: string;
  friendId: string;
}) => {
  return (
    <button onClick={() => removeFromFriendListAction(friendId)}>
      {removeText}
    </button>
  );
};

export default RemoveActionButton;
