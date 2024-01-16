import SignInForm from "@/app/_component/auth/SignInForm";
import showFriendRequestAction from "@/app/api/actions/user/friendActions/showNotificationAction";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import React from "react";
import FriendRequestSection from "./FriendRequestSection";
import MessageSection from "./MessageSection";

const page = async ({ params }: { params: { locale: string } }) => {
  const session = await getServerSession();
  const t = await getTranslations("NotificationPage");
  const data = await showFriendRequestAction("all");

  if (!session) {
    return <SignInForm />;
  }

  return (
    <>
      <h2>{t("header")}</h2>
      <article>
        {data?.map((notification) => {
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
        })}
      </article>
    </>
  );
};

export default page;
