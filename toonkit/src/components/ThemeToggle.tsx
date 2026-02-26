"use client";

import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";
import { ColorModeContext } from "@/app/layout";

export default function ThemeToggle() {
  const { toggleColorMode } = useContext(ColorModeContext);
  return (
    <IconButton onClick={toggleColorMode}>
      <DarkModeIcon />
    </IconButton>
  );
}