import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./notifications.module.css";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ForumIcon from "@mui/icons-material/Forum";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const t = await getTranslations("NotificationPage");
  return (
    <main className={styles.notificationMain}>
      <section className={styles.notificationSection}>{children}</section>
      <div className={styles.notificationContainer}>
        <h2>{t("header")}</h2>
        <nav className={styles.notificationNav}>
          <ul>
            <li>
              <Link href={`/${params.locale}/notifications`}>
                <NotificationsActiveIcon />
                <p>{t("allNotifications")}</p>
              </Link>
            </li>
            <li>
              <Link href={`/${params.locale}/notifications/friend-requests`}>
                <GroupAddIcon />
                <p>{t("friendRequestNotifications")}</p>
              </Link>
            </li>{" "}
            <li>
              <Link href={`/${params.locale}/notifications/messages`}>
                <ForumIcon />
                <p>{t("messageNotifications")}</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export default layout;
