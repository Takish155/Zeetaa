import Link from "next/link";
import React from "react";
import noimage from "@/../public/images/noimage.jpg";
import styles from "./notifications.module.css";
import Image from "next/image";
import formatTimeDifference from "@/_util/formatTimeDifference";

const MessageSection = async ({
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
  const currentDate = formatTimeDifference(date, locale);

  return (
    <section className={styles.notificationSections}>
      <section className={styles.senderInfoSection}>
        <Image src={noimage} alt="picture of the user" width={50} height={50} />
        <h3>{senderUsername}</h3>
      </section>
      <p className={styles.receivedMessage}>{content}</p>
      <p className={styles.sentDate}>{currentDate}</p>
      <div className={styles.buttonContainer}>
        <button>
          <Link passHref href={`/${locale}/messages/${senderUsername}`}>
            {messageBack}
          </Link>
        </button>
      </div>
    </section>
  );
};

export default MessageSection;
