"use client";

import useDeleteAccount from "@/app/_custon_hooks/settings_actions/useDeleteAccount";
import React, { useState } from "react";

const DeleteAccountButton = ({
  text,
  confirmationText,
  invalidPasswordText,
}: {
  text: string;
  confirmationText: string;
  invalidPasswordText: string;
}) => {
  const [confirm, setConfirm] = useState(false);
  const { register, errors, handleSubmit, onSubmit, message, loading } =
    useDeleteAccount();

  if (!confirm) return <button onClick={() => setConfirm(true)}>{text}</button>;

  return (
    <div>
      <p>{confirmationText}</p>
      <form onSubmit={handleSubmit((data) => onSubmit(data.password))}>
        <input type="password" {...register("password")} />
        {errors.password && <p>{invalidPasswordText}</p>}
        {message.message && <p>{message.message}</p>}
        <button type="submit" disabled={loading}>
          {text}
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountButton;
