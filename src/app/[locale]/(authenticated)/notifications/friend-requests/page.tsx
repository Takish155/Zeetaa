import React from "react";
import FriendRequestSection from "../FriendRequestSection";
import showNotificationAction from "@/app/api/actions/user/friendActions/showNotificationAction";

const page = async ({ params }: { params: { locale: string } }) => {
  const data = await showNotificationAction("friendrequest");
  return (
    <article>
      {Array.isArray(data) ? (
        data?.map((request) => {
          return (
            <FriendRequestSection
              locale={params.locale}
              notificationId={request.id}
              senderUsername={request.senderUsername!}
              key={request.id}
            />
          );
        })
      ) : (
        <p>{data?.message}</p>
      )}
    </article>
  );
};

export default page;
