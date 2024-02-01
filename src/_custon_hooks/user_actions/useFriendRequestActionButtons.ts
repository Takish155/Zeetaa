import acceptFriendRequestAction from "@/app/api/actions/user/friendActions/acceptFriendRequestAction";
import rejectFriendRequestAction from "@/app/api/actions/user/friendActions/rejectFriendRequestAction";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const useFriendRequestActionButtons = () => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
    action: "",
  });

  const acceptFriendRequestMutation = useMutation({
    mutationFn: async ({ friendRequestId }: { friendRequestId: string }) =>
      await acceptFriendRequestAction(friendRequestId),
    onSettled: (res) => {
      setMessage({
        message: res?.message!,
        status: res?.status!,
        action: res?.action!,
      });
    },
  });

  const rejectFriendRequestMutation = useMutation({
    mutationFn: async ({ friendRequestId }: { friendRequestId: string }) =>
      await rejectFriendRequestAction(friendRequestId),
    onSettled: (res) => {
      setMessage({
        message: res?.message!,
        status: res?.status!,
        action: res?.action!,
      });
    },
  });

  return {
    message,
    acceptFriendRequestMutation,
    rejectFriendRequestMutation,
  };
};

export default useFriendRequestActionButtons;
