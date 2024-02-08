import React from "react";
import MessageSection from "../MessageSection";
import { getTranslations } from "next-intl/server";
import showNotificationAction from "@/app/api/actions/user/friendActions/showNotificationAction";

const page = async ({ params }: { params: { locale: string } }) => {
  const data = await showNotificationAction("messages");
  const t = await getTranslations("NotificationPage");
  return (
    <article>
      {Array.isArray(data) ? (
        data.length !== 0 ? (
          data?.map((messages) => {
            return (
              <MessageSection
                content={"content" in messages ? messages.content : ""}
                date={messages.createdAt}
                locale={params.locale}
                messageBack={t("messageBack")}
                notificationId={messages.id}
                senderUsername={messages.senderUsername!}
                key={messages.id}
              />
            );
          })
        ) : (
          <p>{t("noNotificationsYet")}</p>
        )
      ) : (
        <p>{data?.message}</p>
      )}
    </article>
  );
};

export default page;
