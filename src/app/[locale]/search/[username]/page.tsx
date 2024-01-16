import searchUserAction from "@/app/api/actions/user/seachUserAction";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const page = async ({
  params,
}: {
  params: { locale: string; username: string };
}) => {
  const data = await searchUserAction(params.username);
  const t = await getTranslations("SearchUserPage");

  return (
    <main>
      <article>
        {data?.map((user) => (
          <section key={user.id}>
            <h2>{user.username}</h2>
            <button>
              <Link href={`/${params.locale}/profile/${user.username}/`}>
                {t("viewProfile")}
              </Link>
            </button>
            {user.relationship !== "user" && (
              <button>
                <Link href={`/${params.locale}/messages/${user.username}/`}>
                  {t("message")}
                </Link>
              </button>
            )}
          </section>
        ))}
      </article>
    </main>
  );
};

export default page;
