import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import FriendActionButton from "./FriendActionButton";
import showFriendList from "@/app/api/actions/user/friendActions/showFriendList";
import styles from "./friends-page.module.css";
import Image from "next/image";
import noimage from "@/../public/images/noimage.jpg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) redirect(`/${locale}/auth/signin`);
  const friendData = await showFriendList();
  const t = await getTranslations("FriendsPage");

  return (
    <main className={styles.main}>
      <h2>{t("header")}</h2>
      {friendData?.sentFriendRequests?.length === 0 &&
        friendData?.receivedFriendRequests?.length === 0 && (
          <p>{t("noFriendsYet")}</p>
        )}
      <article className={styles.article}>
        {friendData.sentFriendRequests?.length !== 0
          ? friendData?.sentFriendRequests!.map((friend) => {
              return (
                <section key={friend.id} className={styles.section}>
                  <Image alt="Image of the user" src={noimage} />
                  <p className={styles.profilename}>{friend.user2.username}</p>
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
            })
          : ""}
        {friendData?.receivedFriendRequests!.map((friend) => {
          // receivedFriendRequests's friend is user1
          return (
            <section key={friend.id} className={styles.section}>
              <Image
                alt="Image of the user"
                width="200"
                height="200"
                src={noimage}
              />
              <p className={styles.profilename}>{friend.user1.username}</p>

              <FriendActionButton
                friendListId={friend.id}
                locale={locale}
                messageText={t("message")}
                removeFriendText={t("removeFriend")}
                visitProfileText={t("visitProfile")}
                username={friend.user1.username!}
              />
            </section>
          );
        })}
      </article>
    </main>
  );
};

export default page;
