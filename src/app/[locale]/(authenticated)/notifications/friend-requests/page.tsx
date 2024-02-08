import React from "react";
import FriendRequestSection from "../FriendRequestSection";
import showNotificationAction from "@/app/api/actions/user/friendActions/showNotificationAction";
import { getTranslations } from "next-intl/server";

const page = async ({ params }: { params: { locale: string } }) => {
  const data = await showNotificationAction("friendrequest");
  const t = await getTranslations("NotificationPage");

  return (
    <article>
      {Array.isArray(data) ? (
        data.length !== 0 ? (
          data?.map((request) => {
            return (
              <FriendRequestSection
                locale={params.locale}
                notificationId={request.id}
                senderUsername={request.senderUsername!}
                key={request.id}
                dateSent={request.createdAt}
              />
            );
          })
        ) : (
          <p>{t("noFriendRequestsYet")}</p>
        )
      ) : (
        <p>{data?.message}</p>
      )}
    </article>
  );
};

export default page;
