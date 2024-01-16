import { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../../prisma/prisma";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/en/auth/signin",
    error: "/en/auth/signin",
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials", // Sets the login system name
      credentials: {
        // Adds email as required to sign in
        username: { label: "Username", type: "text", placeholder: "Username" },
        // Adds password as required to sign in
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // Authenticator
      async authorize(credentials, req) {
        // If nothing is written, it returns an error
        if (!credentials?.username || !credentials?.password) return null;
        // Checks the data base if there's an email
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
        // If the email exists, it returns an error
        if (!user) return null;
        // Searches the database while encrypting the password, first parameter is
        // None hashed password and second is the hashed password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user?.hashedPassword!
        );
        // Returns the user if it exist and null if it doesn't
        return passwordMatch ? user : null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
