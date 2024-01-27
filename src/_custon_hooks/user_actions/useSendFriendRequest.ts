import sendFriendRequestAction from "@/app/api/actions/user/friendActions/sendFriendRequestAction";
import { useState } from "react";

const useSendFriendRequest = () => {
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (userId: string) => {
    setLoading(true);
    const response = await sendFriendRequestAction(userId);
    setMessage({
      message: response.message,
      status: response.status,
    });
    setLoading(false);
  };

  return {
    handleSubmit,
    message,
    loading,
  };
};

export default useSendFriendRequest;
