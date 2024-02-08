import { getServerSession } from "next-auth";
import React from "react";
import PostForm from "./PostForm";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import PostDataSection from "@/_component/feedDisplayer/PostDataSection";
import feedLoaderAction from "@/app/api/actions/user/dataRequestActions/feedLoaderAction";
import { redirect } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { pick } from "lodash";
import styles from "./home-page.module.css";

const page = async () => {
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) redirect(`/${locale}/signin`);
  const t = await getTranslations("HomePage");
  const feedData = await feedLoaderAction();
  const messages = await getMessages();
  return (
    <main className={styles.homeMain}>
      <section>
        <NextIntlClientProvider messages={pick(messages, "FieldError")}>
          <PostForm
            placeholder={t("postHeading")}
            submitText={t("postButton")}
            privateText={t("private")}
            publicText={t("public")}
          />
        </NextIntlClientProvider>
      </section>
      <article>
        <h2>{t("feedSectionHeading")}</h2>
        <section>
          {Array.isArray(feedData) && feedData.length !== 0 ? (
            feedData.map((feed) => {
              return (
                <PostDataSection
                  key={feed.id}
                  feedId={feed.id}
                  feedAuthorUsername={feed.author.username!}
                  feedContent={feed.content}
                  feedCreatedDate={feed.createdAt}
                  likeCount={feed.likeCount}
                  viewerEmail={session!.user?.email!}
                  authorEmail={feed.author.email!}
                />
              );
            })
          ) : (
            <p>{t("noFeedData")}</p>
          )}
        </section>
      </article>
    </main>
  );
};

export default page;
