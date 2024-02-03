import { getTranslations } from "next-intl/server";
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

const page = async ({
  params,
}: {
  params: { username: string; locale: string };
}) => {
  const profileData = await showProfileAction(params.username);
  const session = await getServerSession();
  const t = await getTranslations("ProfilePage");

  return (
    <main className={styles.profileMain}>
      <section>
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
              {t("joinedIn")} {profileData?.userInfo?.createdAt.toDateString()}
            </p>
          </div>
        </section>
        <section className={styles.friendRequestionAction}>
          {session?.user?.email !== profileData.userInfo?.email &&
            (profileData.relationship === "friend" ? (
              <>
                <button>
                  <Link href={`/${params.locale}/messages/${params.username}`}>
                    {t("message")}
                  </Link>
                </button>
                <RemoveActionButton
                  removeText={t("removeFriend")}
                  friendId={profileData.friendId!}
                />
              </>
            ) : profileData.relationship === "stranger" ? (
              <>
                <button>
                  <Link href={`/${params.locale}/messages/${params.username}`}>
                    {t("message")}
                  </Link>
                </button>
                <FriendActionButton
                  textButton={t("addFriend")}
                  userId={profileData.userInfo?.id!}
                />
              </>
            ) : profileData.relationship === "alreadySentFriendRequest" ? (
              <>
                <button>
                  <Link href={`/${params.locale}/messages/${params.username}`}>
                    {t("message")}
                  </Link>
                </button>
                <CancelSentFriendRequestActionButton
                  cancelButtonText={t("cancelFriendRequest")}
                  friendRequestId={profileData.friendRequestId!}
                />
              </>
            ) : profileData.relationship === "receivedFriendRequest" ? (
              <>
                <button>
                  <Link href={`/${params.locale}/messages/${params.username}`}>
                    {t("message")}
                  </Link>
                </button>
                <IncomingFriendRequestAction
                  friendRequestId={profileData.friendRequestId!}
                  acceptText={t("acceptFriendRequest")}
                  rejectText={t("rejectFriendRequest")}
                />
              </>
            ) : (
              <Link href={`/${params.locale}/auth/signin`}>
                <button>{t("noSessionButton")}</button>
              </Link>
            ))}
        </section>
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
