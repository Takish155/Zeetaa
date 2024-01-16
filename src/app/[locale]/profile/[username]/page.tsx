import showProfileAction from "@/app/api/actions/showProfileAction";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import PostDataSection from "../../../_component/feedDisplayer/PostDataSection";
import { getServerSession } from "next-auth";
import FriendActionButton from "./buttons/FriendActionButton";
import RemoveActionButton from "./buttons/RemoveActionButton";
import Link from "next/link";
import CancelSentFriendRequestActionButton from "./buttons/CancelSentFriendRequestActionButton";
import IncomingFriendRequestAction from "./buttons/IncomingFriendRequestAction";

const page = async ({ params }: { params: { username: string } }) => {
  const profileData = await showProfileAction(params.username);
  const session = await getServerSession();
  const locale = await getLocale();
  const t = await getTranslations("ProfilePage");

  return (
    <main>
      <section>
        <h2>{profileData?.userInfo?.username}</h2>
        <p>
          {t("joinedIn")}{" "}
          {profileData?.userInfo?.createdAt.toLocaleDateString()}
        </p>
        {session?.user?.email !== profileData.userInfo?.email &&
          (profileData.relationship === "friend" ? (
            <RemoveActionButton
              removeText={t("removeFriend")}
              friendId={profileData.friendId!}
            />
          ) : profileData.relationship === "stranger" ? (
            <FriendActionButton
              textButton={t("addFriend")}
              userId={profileData.userInfo?.id!}
            />
          ) : profileData.relationship === "alreadySentFriendRequest" ? (
            <CancelSentFriendRequestActionButton
              cancelButtonText={t("cancelFriendRequest")}
              friendRequestId={profileData.friendRequestId!}
            />
          ) : profileData.relationship === "receivedFriendRequest" ? (
            <IncomingFriendRequestAction
              friendRequestId={profileData.friendRequestId!}
              acceptText={t("acceptFriendRequest")}
              rejectText={t("rejectFriendRequest")}
            />
          ) : (
            <Link href={`/${locale}/auth/signin`}>
              <button>{t("noSessionButton")}</button>
            </Link>
          ))}
      </section>
      <article>
        <h2>{t("feedHeading")}</h2>
        <section>
          {profileData?.userFeeds?.map((feed) => {
            return (
              <PostDataSection
                key={feed.id}
                feedId={feed.id}
                feedAuthorUsername={feed.author.username!}
                feedContent={feed.content}
                feedCreatedDate={feed.createdAt}
                likeCount={feed.likeCount}
                viewerEmail={session?.user?.email}
                authorEmail={feed.author.email!}
              />
            );
          })}
        </section>
      </article>
    </main>
  );
};

export default page;
