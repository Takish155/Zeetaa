import SignInForm from "@/app/_component/auth/SignInForm";
import showFriendRequestAction from "@/app/api/actions/user/friendActions/showFriendRequestAction";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import FriendRequestActionButtons from "./FriendRequestActionButtons";

const page = async () => {
  const session = await getServerSession();
  const t = await getTranslations("NotificationPage");
  const data = await showFriendRequestAction();
  const locale = await getLocale();

  if (!session) {
    return <SignInForm />;
  }

  return (
    <main>
      <h2>{t("header")}</h2>
      <article>
        <h2>{t("friendRequestHeading")}</h2>
        <section>
          {data.map((friendRequest) => {
            return (
              <div key={friendRequest.id}>
                <p>
                  {friendRequest.senderUsername}{" "}
                  {t("someoneSentYouFriendRequestText")}
                </p>
                <FriendRequestActionButtons
                  acceptText={t("acceptButton")}
                  rejectText={t("rejectButton")}
                  viewProfileText={t("viewProfileText")}
                  friendRequestId={friendRequest.id}
                  locale={locale}
                  username={friendRequest.senderUsername}
                />
              </div>
            );
          })}
        </section>
      </article>
    </main>
  );
};

export default page;
