"use client";

import useUpdateBio from "@/_custon_hooks/settings_actions/useUpdateBio";
import React from "react";

const BioSection = ({ text }: { text: string }) => {
  const { errors, handleSubmit, loading, message, register, onSubmit } =
    useUpdateBio();
  return (
    <div>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <textarea {...register("bio")}></textarea>
        {errors.bio && <p>{errors.bio.message}</p>}
        {message && <p>{message.message}</p>}
        <button type="submit" disabled={loading}>
          {text}
        </button>
      </form>
    </div>
  );
};

export default BioSection;
