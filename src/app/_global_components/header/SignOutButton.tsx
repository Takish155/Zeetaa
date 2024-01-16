"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOutButton = () => {
  return (
    <li>
      <button onClick={() => signOut()}>Sign Out</button>
    </li>
  );
};

export default SignOutButton;
