import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React, { ReactNode } from "react";
import styles from "./settings.module.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import type { Viewport } from "next";

const layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const t = await getTranslations("SettingsPage");
  return (
    <main className={styles.settingMain}>
      <div className={styles.settingContainer}>{children}</div>
      <div className={styles.navContainer}>
        <h2>{t("header")}</h2>
        <nav className={styles.settingsNav}>
          <ul>
            <li>
              <Link href={`/${params.locale}/settings`}>
                <AdminPanelSettingsIcon />
                <p>{t("account")}</p>
              </Link>
            </li>
            <li>
              <Link
                data-test="nav-details"
                href={`/${params.locale}/settings/personal_details`}
              >
                <SettingsApplicationsIcon />
                <p>{t("personalDetails")}</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
};

export const viewport: Viewport = {
  userScalable: false,
};

export default layout;
