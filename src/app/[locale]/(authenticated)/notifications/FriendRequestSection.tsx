import { useTranslations } from "next-intl";
import React from "react";
import FriendRequestActionButtons from "./FriendRequestActionButtons";
import styles from "./notifications.module.css";
import formatTimeDifference from "@/_util/formatTimeDifference";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import noimage from "@/../public/images/noimage.jpg";

const FriendRequestSection = async ({
  notificationId,
  locale,
  senderUsername,
  dateSent,
}: {
  notificationId: string;
  locale: string;
  senderUsername: string;
  dateSent: Date;
}) => {
  const t = await getTranslations("NotificationPage");
  const date = formatTimeDifference(dateSent, locale);

  return (
    <section className={styles.notificationSections}>
      <section className={styles.senderInfoSection}>
        <Image src={noimage} alt="picture of the user" width={50} height={50} />
        <p>
          {senderUsername} {t("someoneSentYouFriendRequestText")}
        </p>
      </section>
      <p className={styles.sentDate}>{date}</p>
      <FriendRequestActionButtons
        acceptText={t("acceptButton")}
        rejectText={t("rejectButton")}
        viewProfileText={t("viewProfileText")}
        friendRequestId={notificationId}
        locale={locale}
        username={senderUsername}
      />
    </section>
  );
};

export default FriendRequestSection;
