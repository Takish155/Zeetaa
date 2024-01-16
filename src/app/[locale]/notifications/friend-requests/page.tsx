import showNotificationAction from "@/app/api/actions/user/friendActions/showNotificationAction";
import React from "react";
import FriendRequestSection from "../FriendRequestSection";

const page = async ({ params }: { params: { locale: string } }) => {
  const data = await showNotificationAction("friendrequest");
  return (
    <article>
      {data?.map((request) => {
        return (
          <FriendRequestSection
            locale={params.locale}
            notificationId={request.id}
            senderUsername={request.senderUsername!}
            key={request.id}
          />
        );
      })}
    </article>
  );
};

export default page;
