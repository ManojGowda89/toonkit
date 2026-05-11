"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState, createContext } from "react";
import { getTheme } from "@/theme/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
