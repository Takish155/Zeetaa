"use client";

import React from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const SessionHeader = ({
  locale,
  username,
}: {
  locale: string;
  username: string;
}) => {
  const t = useTranslations("Header");
  const path = usePathname();

  return (
    <>
      <li
        style={{
          backgroundColor: path.includes(`/${locale}/home`) ? "gray" : "",
        }}
      >
        <Link passHref href={`/${locale}/home`}>
          <HomeIcon />
          <p>{t("home")}</p>
        </Link>
      </li>
      <li
        style={{
          backgroundColor: path.includes(`/${locale}/notifications`)
            ? "gray"
            : "",
        }}
      >
        <Link passHref href={`/${locale}/notifications`}>
          <NotificationsIcon />
          <p>{t("notifications")}</p>
        </Link>
      </li>
      <li
        style={{
          backgroundColor: path.includes(`/${locale}/friends`) ? "gray" : "",
        }}
      >
        <Link passHref href={`/${locale}/friends`}>
          <PeopleIcon />
          <p>{t("friends")}</p>
        </Link>
      </li>
      <li
        style={{
          backgroundColor: path.includes(`/${locale}/profile`) ? "gray" : "",
        }}
      >
        <Link passHref href={`/${locale}/profile/${username}`}>
          <AccountBoxIcon />
          <p>{t("profile")}</p>
        </Link>
      </li>

      <li
        style={{
          backgroundColor: path.includes(`/${locale}/settings`) ? "gray" : "",
        }}
      >
        <Link passHref href={`/${locale}/settings`} data-test="nav-settings">
          <SettingsIcon />
          <p>{t("settings")}</p>
        </Link>
      </li>
    </>
  );
};

export default SessionHeader;
