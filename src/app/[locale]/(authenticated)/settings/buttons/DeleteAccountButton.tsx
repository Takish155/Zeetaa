"use client";

import useDeleteAccount from "@/_custon_hooks/settings_actions/useDeleteAccount";
import React, { useState } from "react";
import styles from "./../settings.module.css";

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

  if (!confirm)
    return (
      <button onClick={() => setConfirm(true)} className={styles.deleteButton}>
        {text}
      </button>
    );

  return (
    <div>
      <p>{confirmationText}</p>
      <form onSubmit={handleSubmit((data) => onSubmit(data.password))}>
        {message.message && (
          <p
            className={
              message.status === "error"
                ? "server-message-error"
                : "server-message-success"
            }
          >
            {message.message}
          </p>
        )}
        <input type="password" {...register("password")} />
        {errors.password && (
          <p className="field-error">{invalidPasswordText}</p>
        )}
        <br />
        <button
          type="submit"
          disabled={loading}
          className={styles.deleteButton}
        >
          {text}
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountButton;
