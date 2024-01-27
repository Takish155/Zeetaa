import { getServerSession } from "next-auth";
import React from "react";
import PostForm from "./PostForm";
import { getLocale, getTranslations } from "next-intl/server";
import PostDataSection from "@/_component/feedDisplayer/PostDataSection";
import feedLoaderAction from "@/app/api/actions/user/dataRequestActions/feedLoaderAction";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  const t = await getTranslations("HomePage");
  const feedData = await feedLoaderAction();
  const locale = await getLocale();
  if (!session) redirect(`/${locale}/auth/signin`);

  return (
    <main>
      <h2>{t("header")}</h2>
      <section>
        <h2>
          {t("postHeading")} {session.user?.name}
        </h2>
        <PostForm
          submitText={t("postButton")}
          privateText={t("private")}
          publicText={t("public")}
        />
      </section>
      <article>
        <h2>{t("feedSectionHeading")}</h2>
        <section>
          {Array.isArray(feedData) &&
            feedData.map((feed) => {
              return (
                <PostDataSection
                  key={feed.id}
                  feedId={feed.id}
                  feedAuthorUsername={feed.author.username!}
                  feedContent={feed.content}
                  feedCreatedDate={feed.createdAt}
                  likeCount={feed.likeCount}
                  viewerEmail={session.user?.email!}
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
