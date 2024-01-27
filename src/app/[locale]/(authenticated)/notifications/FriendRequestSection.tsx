import { useTranslations } from "next-intl";
import React from "react";
import FriendRequestActionButtons from "./FriendRequestActionButtons";

const FriendRequestSection = ({
  notificationId,
  locale,
  senderUsername,
}: {
  notificationId: string;
  locale: string;
  senderUsername: string;
}) => {
  const t = useTranslations("NotificationPage");
  return (
    <section>
      <p>
        {senderUsername} {t("someoneSentYouFriendRequestText")}
      </p>
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
