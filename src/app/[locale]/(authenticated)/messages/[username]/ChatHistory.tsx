"use client";

import { useOptimisticChatContext } from "@/_context/OptimisitcChatProvider";
import useChatHistory from "@/_custon_hooks/user_actions/useChatHistory";
import styles from "./chat-page.module.css";
import React from "react";
import formatTimeDifference from "@/_util/formatTimeDifference";
import { useLocale } from "next-intl";
import { CircularProgress } from "@mui/material";
const ChatHistory = ({ username }: { username: string }) => {
  const locale = useLocale();
  const { isLoading, data, chatEndRef, ref } = useChatHistory(username);
  const context = useOptimisticChatContext();
  if (!context) return null;
  const { messages } = context;

  if (isLoading)
    return (
      <section className={styles.loadingSection}>
        <CircularProgress sx={{ margin: "0 2rem" }} />
      </section>
    );
  return (
    <section className={styles.chatSection}>
      <div ref={chatEndRef}></div>
      <section className={styles.recentChatSection}>
        {messages.map((message, index) => (
          <section
            key={index}
            style={{ alignSelf: message.sender === "You" ? "flex-end" : "" }}
            className={message.sender === "You" ? styles.fromMe : ""}
          >
            <p>{message.sender}</p>
            {message.status && (
              <p>{message.status === "pending" ? "pending" : "sent"}</p>
            )}
            <p className={styles.chatContent}>{message.content}</p>
            <p className={styles.createdAt}>
              {formatTimeDifference(message.date, locale)}
            </p>
          </section>
        ))}
      </section>
      {data?.pages.map((chats) =>
        chats?.data?.map((chat) => {
          const senderUsername = chat.sender.username;
          return (
            <section
              key={chat.id}
              className={
                senderUsername === username ? styles.fromThem : styles.fromMe
              }
            >
              <p className={styles.chatContent}>{chat.content}</p>
              <p className={styles.createdAt}>
                {formatTimeDifference(chat.createdAt, locale)}
              </p>
            </section>
          );
        })
      )}
      <div ref={ref} className={styles.intersectionObserver}>
        a
      </div>
    </section>
  );
};

export default ChatHistory;
