import showFriendList from "@/app/api/actions/user/friendActions/showFriendList";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import FriendActionButton from "./FriendActionButton";

const page = async () => {
  const friendData = await showFriendList();
  const t = await getTranslations("FriendsPage");
  const locale = await getLocale();
  return (
    <main>
      <h2>{t("header")}</h2>
      <article>
        {friendData?.sentFriendRequests.map((friend) => {
          // sentFriendRequests's friend is user2
          return (
            <section key={friend.id}>
              <p>{friend.user2.username}</p>
              <p>{friend.createdAt.toLocaleDateString()}</p>
              <FriendActionButton
                friendListId={friend.id}
                messageText={t("message")}
                locale={locale}
                removeFriendText={t("removeFriend")}
                visitProfileText={t("visitProfile")}
                username={friend.user2.username!}
              />
            </section>
          );
        })}
        {friendData?.receivedFriendRequests.map((friend) => {
          // receivedFriendRequests's friend is user1
          return (
            <section key={friend.id}>
              <p>{friend.user1.username}</p>
              <FriendActionButton
                friendListId={friend.id}
                locale={locale}
                messageText={t("message")}
                removeFriendText={t("removeFriend")}
                visitProfileText={t("visitProfile")}
                username={friend.user1.username!}
              />
              <p>
                {t("friendSinceText") + " " + friend.createdAt.toDateString()}
              </p>
            </section>
          );
        })}
      </article>
    </main>
  );
};

export default page;
