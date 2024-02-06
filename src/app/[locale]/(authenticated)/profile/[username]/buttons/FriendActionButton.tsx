"use client";

import useSendFriendRequest from "@/_custon_hooks/user_actions/useSendFriendRequest";

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
      {message.message && (
        <p
          className={
            message.status === "error"
              ? "server-message-error"
              : "server-message-success"
          }
        >
          {message.message}
        </p>
      )}
      <button disabled={loading} onClick={() => handleSubmit(userId)}>
        {textButton}
      </button>
    </>
  );
};

export default FriendActionButton;
