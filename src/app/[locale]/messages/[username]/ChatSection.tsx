"use client";

import useChatSection from "@/app/_custon_hooks/user_actions/useChatSection";
import Pusher from "pusher-js";
import React from "react";
const ChatSection = ({
  username,
  chatChannel,
}: {
  username: string;
  chatChannel: string;
}) => {
  const { isLoading, data } = useChatSection(username, chatChannel);

  if (isLoading) return <section>Loading...</section>;
  return (
    <section>
      {data?.map((chat) => (
        <div>
          <h3>{chat.sender.username}</h3>
          <p>{chat.content}</p>
          <p>{chat.sender.createdAt.toLocaleString()}</p>
        </div>
      ))}
    </section>
  );
};

export default ChatSection;
