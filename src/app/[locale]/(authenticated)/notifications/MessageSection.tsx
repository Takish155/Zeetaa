import Link from "next/link";
import React from "react";

const MessageSection = ({
  locale,
  content,
  senderUsername,
  date,
  messageBack,
}: {
  notificationId: string;
  locale: string;
  content: string;
  senderUsername: string;
  messageBack: string;
  date: Date;
}) => {
  return (
    <section>
      <h2>{senderUsername}</h2>
      <p>{content}</p>
      <p>{date.toLocaleDateString()}</p>
      <button>
        <Link href={`/${locale}/messages/${senderUsername}`}>
          {messageBack}
        </Link>
      </button>
    </section>
  );
};

export default MessageSection;
