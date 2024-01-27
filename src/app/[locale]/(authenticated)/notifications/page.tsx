import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";
import FriendRequestSection from "./FriendRequestSection";
import MessageSection from "./MessageSection";
import SignInForm from "@/_component/auth/SignInForm";
import showNotificationAction from "@/app/api/actions/user/friendActions/showNotificationAction";

const page = async ({ params }: { params: { locale: string } }) => {
  const session = await getServerSession();
  const t = await getTranslations("NotificationPage");
  const data = await showNotificationAction("all");

  if (!session) {
    return <SignInForm />;
  }

  return (
    <>
      <h2>{t("header")}</h2>
      <article>
        {Array.isArray(data) ? (
          data?.map((notification) => {
            if (notification.type === "friendrequest") {
              return (
                <FriendRequestSection
                  locale={params.locale}
                  notificationId={notification.id}
                  senderUsername={notification.senderUsername!}
                  key={notification.id}
                />
              );
            }
            return (
              <MessageSection
                content={"content" in notification ? notification.content : ""}
                date={notification.createdAt}
                locale={params.locale}
                messageBack={t("messageBack")}
                notificationId={notification.id}
                senderUsername={notification.senderUsername!}
                key={notification.id}
              />
            );
          })
        ) : (
          <p>{data?.message}</p>
        )}
      </article>
    </>
  );
};

export default page;
