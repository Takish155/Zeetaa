"use client";

import { useOptimisticChatContext } from "@/_context/OptimisitcChatProvider";
import useChatHistory from "@/_custon_hooks/user_actions/useChatHistory";
import React from "react";
const ChatHistory = ({ username }: { username: string }) => {
  const { isLoading, data, chatEndRef, ref } = useChatHistory(username);
  const context = useOptimisticChatContext();
  if (!context) return null;
  const { messages } = context;

  if (isLoading) return <section>Loading...</section>;
  return (
    <section
      style={{
        height: "40vh",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <div ref={chatEndRef}></div>
      <section>
        {messages.map((message, index) => (
          <section key={index}>
            <h3>{message.sender}</h3>
            {message.status && (
              <p>{message.status === "pending" ? "pending" : "sent"}</p>
            )}
            <p>{message.content}</p>
            <p>{message.date.toLocaleString()}</p>
          </section>
        ))}
      </section>
      {data?.pages.map((chats) =>
        chats?.data?.map((chat) => {
          const senderUsername = chat.sender.username;
          return (
            <section key={chat.id}>
              <h3>{username === senderUsername ? senderUsername : "You"}</h3>
              <p>{chat.content}</p>
              <p>{chat.createdAt.toLocaleString()}</p>
            </section>
          );
        })
      )}
      <div ref={ref}>a</div>
    </section>
  );
};

export default ChatHistory;
