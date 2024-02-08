"use client";

import useSendFriendRequest from "@/_custon_hooks/user_actions/useSendFriendRequest";
import { CircularProgress } from "@mui/material";

const FriendActionButton = ({
  textButton,
  userId,
}: {
  textButton: string;
  userId: string;
}) => {
  const { handleSubmit, message, loading } = useSendFriendRequest();
  return (
    <>
      {!loading ? (
        <button disabled={loading} onClick={() => handleSubmit(userId)}>
          {textButton}
        </button>
      ) : (
        <CircularProgress sx={{ margin: "0 2rem" }} />
      )}
    </>
  );
};

export default FriendActionButton;
