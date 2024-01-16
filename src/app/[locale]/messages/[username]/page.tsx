import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import ChatSection from "./ChatSection";
import SendMessageSection from "./SendMessageSection";
import getChatChannelAction from "@/app/api/actions/user/chatActions/getChatChannelAction";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";
const page = async ({ params }: { params: { username: string } }) => {
  const locale = await getLocale();
  const t = await getTranslations("MessagesPage");
  const chatChannel = await getChatChannelAction(params.username);
  const user = await getUserDataAction();

  if (user?.username === params.username)
    throw new Error("You can't chat with yourself");

  return (
    <main>
      <article>
        <h2>
          <Link href={`/${locale}/profile/${params.username}`}>
            {params.username}
          </Link>
        </h2>
        <ChatSection username={params.username} chatChannel={chatChannel} />
        <SendMessageSection
          sendButtonText={t("sendButtonText")}
          username={params.username}
        />
      </article>
    </main>
  );
};

export default page;
