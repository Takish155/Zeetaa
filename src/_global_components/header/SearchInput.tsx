"use client";

import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const SearchInput = ({
  placeholder,
  locale,
}: {
  placeholder: string;
  locale: string;
}) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="searchButton"
        onClick={() => {
          router.push(`/${locale}/search/${search}`);
        }}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
