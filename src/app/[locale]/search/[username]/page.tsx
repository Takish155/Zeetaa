import searchUserAction from "@/app/api/actions/user/seachUserAction";
import { getLocale, getTranslations } from "next-intl/server";
import noimage from "@/../public/images/noimage.jpg";
import Link from "next/link";
import React from "react";
import styles from "./search-page.module.css";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async ({
  params,
}: {
  params: { locale: string; username: string };
}) => {
  const locale = await getLocale();
  const session = await getServerSession();
  if (!session) redirect(`/${locale}/auth/signin`);
  const data = await searchUserAction(params.username);
  const t = await getTranslations("SearchUserPage");

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        {Array.isArray(data) ? (
          data.length !== 0 ? (
            data?.map((user) => (
              <section key={user.id} className={styles.section}>
                <Image alt="Image of the user" src={noimage} />
                <p className={styles.profilename}>{user.username}</p>
                <section className={styles.buttonContainer}>
                  <Link
                    passHref
                    href={`/${params.locale}/profile/${user.username}/`}
                  >
                    <button>{t("viewProfile")}</button>
                  </Link>
                  {user.relationship !== "user" && (
                    <Link href={`/${params.locale}/messages/${user.username}/`}>
                      <button>{t("message")}</button>
                    </Link>
                  )}
                </section>
              </section>
            ))
          ) : (
            <p className={styles.errorText}>{t("noUserFoundError")}</p>
          )
        ) : (
          <p className={styles.errorText}>{data?.message}</p>
        )}
      </article>
    </main>
  );
};

export default page;
