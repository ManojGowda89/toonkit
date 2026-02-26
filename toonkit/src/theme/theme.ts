"use client";

import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#6366f1" },
      background: {
        default: mode === "dark" ? "#0b0b0f" : "#fafafa",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });