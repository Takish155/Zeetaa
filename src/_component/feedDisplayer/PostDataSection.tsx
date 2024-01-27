import React from "react";
import LikePostButton from "./buttons/LikePostButton";
import DeletePostButton from "./buttons/DeletePostButton";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import formatTimeDifference from "@/_util/formatTimeDifference";
import Image from "next/image";
import noImage from "@/../public/images/noimage.jpg";

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
  const date = await formatTimeDifference(feedCreatedDate);

  return (
    <section>
      <div>
        <Image src={noImage} alt="image of the user" width="50" height="50" />
      </div>
      <p>
        @{feedAuthorUsername} <span>({date})</span>
      </p>
      <p>{feedContent}</p>
      {viewerEmail ? (
        <LikePostButton
          postId={feedId}
          likeText={t("likeButton")}
          likeCount={likeCount}
        />
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
