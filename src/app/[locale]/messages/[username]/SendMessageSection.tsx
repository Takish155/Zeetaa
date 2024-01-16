"use client";

import sendMessageAction from "@/app/api/actions/user/chatActions/sendMessageAction";
import React, { useState } from "react";

const SendMessageSection = ({
  sendButtonText,
  username,
}: {
  sendButtonText: string;
  username: string;
}) => {
  const [message, setMessage] = useState("");
  return (
    <section>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        onClick={() => {
          sendMessageAction(username, message);
          setMessage("");
        }}
      >
        {sendButtonText}
      </button>
    </section>
  );
};

export default SendMessageSection;
