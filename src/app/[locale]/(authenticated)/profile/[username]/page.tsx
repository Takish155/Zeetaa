import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import { getServerSession } from "next-auth";
import FriendActionButton from "./buttons/FriendActionButton";
import RemoveActionButton from "./buttons/RemoveActionButton";
import Link from "next/link";
import CancelSentFriendRequestActionButton from "./buttons/CancelSentFriendRequestActionButton";
import IncomingFriendRequestAction from "./buttons/IncomingFriendRequestAction";
import PostDataSection from "@/_component/feedDisplayer/PostDataSection";
import showProfileAction from "@/app/api/actions/showProfileAction";
import Image from "next/image";
import noImage from "@/../public/images/noimage.jpg";
import styles from "./profile-style.module.css";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { redirect } from "next/navigation";
import formatTimeDifference from "@/_util/formatTimeDifference";

const page = async ({
  params,
}: {
  params: { username: string; locale: string };
}) => {
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) redirect(`/${locale}/auth/signin`);
  const profileData = await showProfileAction(params.username);
  const t = await getTranslations("ProfilePage");

  return (
    <main className={styles.profileMain}>
      <section className={styles.profileSection}>
        <section className={styles.imageSection}>
          <Image
            src={noImage}
            alt="image of the user"
            width={100}
            height={100}
          />
          <div>
            <h2>{profileData?.userInfo?.username}</h2>
            <p>{profileData.userInfo?.bio}</p>
            <p className={styles.joinText}>
              <CelebrationIcon />
              {t("joinedIn")}{" "}
              {formatTimeDifference(profileData?.userInfo?.createdAt!, locale)}
            </p>
          </div>
        </section>
        <section className={styles.friendRequestionAction}>
          {session?.user?.email !== profileData.userInfo?.email &&
            (profileData.relationship === "friend" ? (
              <>
                <Link
                  passHref
                  href={`/${params.locale}/messages/${params.username}`}
                >
                  <button>{t("message")}</button>
                </Link>
                <RemoveActionButton
                  removeText={t("removeFriend")}
                  friendId={profileData.friendId!}
                />
              </>
            ) : profileData.relationship === "stranger" ? (
              <>
                <Link
                  passHref
                  href={`/${params.locale}/messages/${params.username}`}
                >
                  <button>{t("message")}</button>
                </Link>
                <FriendActionButton
                  textButton={t("addFriend")}
                  userId={profileData.userInfo?.id!}
                />
              </>
            ) : profileData.relationship === "alreadySentFriendRequest" ? (
              <>
                <Link
                  passHref
                  href={`/${params.locale}/messages/${params.username}`}
                >
                  <button>{t("message")}</button>
                </Link>
                <CancelSentFriendRequestActionButton
                  cancelButtonText={t("cancelFriendRequest")}
                  friendRequestId={profileData.friendRequestId!}
                />
              </>
            ) : profileData.relationship === "receivedFriendRequest" ? (
              <>
                <Link
                  passHref
                  href={`/${params.locale}/messages/${params.username}`}
                >
                  <button>{t("message")}</button>
                </Link>
                <IncomingFriendRequestAction
                  friendRequestId={profileData.friendRequestId!}
                  acceptText={t("acceptFriendRequest")}
                  rejectText={t("rejectFriendRequest")}
                />
              </>
            ) : (
              <Link passHref href={`/${params.locale}/auth/signin`}>
                <button>{t("noSessionButton")}</button>
              </Link>
            ))}
        </section>
      </section>
      <article>
        <h2>{t("feedHeading")}</h2>
        <section>
          {profileData.userFeeds?.length !== 0 ? (
            profileData?.userFeeds?.map((feed) => {
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
            })
          ) : (
            <p>
              {params.username} {t("noFeedData")}
            </p>
          )}
        </section>
      </article>
    </main>
  );
};

export default page;
