"use client";

import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ForumIcon from "@mui/icons-material/Forum";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "@/app/[locale]/(authenticated)/notifications/notifications.module.css";
import { usePathname } from "next/navigation";

const NotificationNav = ({ locale }: { locale: string }) => {
  const t = useTranslations("NotificationPage");
  const path = usePathname();
  return (
    <nav className={styles.notificationNav}>
      <ul>
        <li
          style={{
            backgroundColor: path === `/${locale}/notifications` ? "gray" : "",
          }}
        >
          <Link passHref href={`/${locale}/notifications`}>
            <NotificationsActiveIcon />
            <p>{t("allNotifications")}</p>
          </Link>
        </li>
        <li
          style={{
            backgroundColor:
              path === `/${locale}/notifications/friend-requests` ? "gray" : "",
          }}
        >
          <Link passHref href={`/${locale}/notifications/friend-requests`}>
            <GroupAddIcon />
            <p>{t("friendRequestNotifications")}</p>
          </Link>
        </li>{" "}
        <li
          style={{
            backgroundColor:
              path === `/${locale}/notifications/messages` ? "gray" : "",
          }}
        >
          <Link passHref href={`/${locale}/notifications/messages`}>
            <ForumIcon />
            <p>{t("messageNotifications")}</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NotificationNav;
