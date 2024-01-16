import React from "react";
import LikePostButton from "./buttons/LikePostButton";
import DeletePostButton from "./buttons/DeletePostButton";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

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

  return (
    <section>
      <h3>
        {t("authorHeading")}: {feedAuthorUsername}
      </h3>
      <p>{feedContent}</p>
      <p>
        {t("postedDateHeading")}: {feedCreatedDate.toLocaleDateString()}{" "}
        {t("betweenTimeText")} {feedCreatedDate.toLocaleTimeString()}
      </p>
      <p>
        {likeCount} {t("likeText")}
      </p>
      {viewerEmail ? (
        <LikePostButton postId={feedId} likeText={t("likeButton")} />
      ) : (
        <Link href={`/${locale}/auth/signin`}>
          <button>{t("loginToLikeText")}</button>
        </Link>
      )}
      {viewerEmail === authorEmail && (
        <DeletePostButton postId={feedId} deleteText={t("deleteButton")} />
      )}
    </section>
  );
};

export default PostDataSection;
