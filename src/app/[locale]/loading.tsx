import { CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default loading;
