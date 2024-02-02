import React from "react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import getUserDataAction from "@/app/api/actions/user/dataRequestActions/getUserDataAction";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";

const iconStyles: React.CSSProperties = {
  marginRight: "0.6rem",
  width: "1.5rem",
  height: "1.5rem",
};

const SessionHeader = async ({ locale }: { locale: string }) => {
  const t = await getTranslations("Header");
  const userData = await getUserDataAction();
  return (
    <>
      <li>
        <Link href={`/${locale}/home`}>
          <HomeIcon />
          <p>{t("home")}</p>
        </Link>
      </li>
      <li>
        <Link href={`/${locale}/notifications`}>
          <NotificationsIcon />
          <p>{t("notifications")}</p>
        </Link>
      </li>
      <li>
        <Link href={`/${locale}/friends`}>
          <PeopleIcon />
          <p>{t("friends")}</p>
        </Link>
      </li>
      {"username" in userData && (
        <li>
          <Link href={`/${locale}/profile/${userData?.username}`}>
            <AccountBoxIcon />
            <p>{t("profile")}</p>
          </Link>
        </li>
      )}

      <li>
        <Link href={`/${locale}/settings`} data-test="nav-settings">
          <SettingsIcon />
          <p>{t("settings")}</p>
        </Link>
      </li>
      <SignOutButton />
    </>
  );
};

export default SessionHeader;
