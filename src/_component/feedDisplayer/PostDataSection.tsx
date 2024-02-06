import React from "react";
import LikePostButton from "./buttons/LikePostButton";
import DeletePostButton from "./buttons/DeletePostButton";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import formatTimeDifference from "@/_util/formatTimeDifference";
import Image from "next/image";
import noImage from "@/../public/images/noimage.jpg";
import styles from "@/app/[locale]/(authenticated)/home/home-page.module.css";

const PostDataSection = async ({
  feedId,
  feedAuthorUsername,
  feedContent,
  feedCreatedDate,
  likeCount,
  viewerEmail,
  authorEmail,
}: {
  feedId: string;
  feedAuthorUsername: string;
  feedContent: string;
  feedCreatedDate: Date;
  likeCount: number;
  viewerEmail: string | null | undefined;
  authorEmail: string;
}) => {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const date = formatTimeDifference(feedCreatedDate, locale);

  return (
    <section className={styles.postSection}>
      <Link href={`/${locale}/profile/${feedAuthorUsername}`} passHref>
        <section className={styles.postSectionDiv}>
          <Image src={noImage} alt="image of the user" width="50" height="50" />
          <h3>
            {feedAuthorUsername}{" "}
            <span className={styles.timeStamp}>({date})</span>
          </h3>
        </section>
      </Link>
      <p>{feedContent}</p>
      <section className={styles.buttonSection}>
        {viewerEmail ? (
          <LikePostButton postId={feedId} likeCount={likeCount} />
        ) : (
          <Link href={`/${locale}/auth/signin`}>
            <button>{t("loginToLikeText")}</button>
          </Link>
        )}
        {viewerEmail === authorEmail && <DeletePostButton postId={feedId} />}
      </section>
    </section>
  );
};

export default PostDataSection;
