import showNotificationAction from "@/app/api/actions/user/friendActions/showNotificationAction";
import React from "react";
import MessageSection from "../MessageSection";
import { getTranslations } from "next-intl/server";

const page = async ({ params }: { params: { locale: string } }) => {
  const data = await showNotificationAction("messages");
  const t = await getTranslations("NotificationPage");
  return (
    <article>
      {data?.map((messages) => {
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
      })}
    </article>
  );
};

export default page;
