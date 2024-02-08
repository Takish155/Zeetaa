import React from "react";
import FriendRequestSection from "../FriendRequestSection";
import showNotificationAction from "@/app/api/actions/user/friendActions/showNotificationAction";
import { getLocale, getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { locale: string } }) => {
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) redirect(`/${locale}/signin`);
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
