"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = ({ text }: { text: string }) => {
  return <button onClick={() => signOut()}>{text}</button>;
};

export default SignOutButton;
