import SignInForm from "@/app/_component/auth/SignInForm";
import { getServerSession } from "next-auth";
import React from "react";
import PostForm from "./PostForm";
import { getTranslations } from "next-intl/server";
import feedLoaderAction from "@/app/api/actions/user/dataRequestActions/feedLoaderAction";
import PostDataSection from "../../_component/feedDisplayer/PostDataSection";

const page = async () => {
  const session = await getServerSession();
  const t = await getTranslations("HomePage");
  const feedData = await feedLoaderAction();

  if (!session) {
    return (
      <main>
        <SignInForm />
        hello
      </main>
    );
  }

  return (
    <main>
      <h2>{t("header")}</h2>
      <section>
        <h2>
          {t("postHeading")} {session.user?.name}
        </h2>
        <PostForm submitText={t("postButton")} />
      </section>
      <article>
        <h2>{t("feedSectionHeading")}</h2>
        <section>
          {feedData.map((feed) => {
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

          {/* {feedData?.map((page) => {
            return page.user1.posts.map((feed) => {
              return (<PostDataSection
              key={feed.id}
              feedId={feed.id}
              feedAuthorUsername={feed.author.username!}
              feedContent={feed.content}
              feedCreatedDate={feed.createdAt}
              likeCount={feed.likeCount}
              viewerEmail={session.user?.email!}
              authorEmail={feed.author.email!}
            />)
          })}
          */}
        </section>
      </article>
    </main>
  );
};

export default page;
