import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const t = await getTranslations("NotificationPage");
  return (
    <main>
      <nav>
        <ul>
          <li>
            <Link href={`/${params.locale}/notifications`}>
              {t("allNotifications")}
            </Link>
          </li>
          <li>
            <Link href={`/${params.locale}/notifications/friend-requests`}>
              {t("friendRequestNotifications")}
            </Link>
          </li>{" "}
          <li>
            <Link href={`/${params.locale}/notifications/messages`}>
              {t("messageNotifications")}
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
};

export default layout;
