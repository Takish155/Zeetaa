import acceptFriendRequestAction from "@/app/api/actions/user/friendActions/acceptFriendRequestAction";
import rejectFriendRequestAction from "@/app/api/actions/user/friendActions/rejectFriendRequestAction";
import React, { useState } from "react";

const useFriendRequestActionButtons = () => {
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    status: "",
    action: "",
  });
  const handleAcceptFriendRequest = async (friendRequestId: string) => {
    setDisabled(true);
    const response = await acceptFriendRequestAction(friendRequestId);
    setMessage({
      message: response.message,
      status: response.status,
      action: response.action,
    });
  };
  const handleRejectFriendRequest = async (friendRequestId: string) => {
    setDisabled(true);
    const response = await rejectFriendRequestAction(friendRequestId);
    setMessage({
      message: response.message,
      status: response.status,
      action: response.action,
    });
  };

  return {
    disabled,
    message,
    handleAcceptFriendRequest,
    handleRejectFriendRequest,
  };
};

export default useFriendRequestActionButtons;
