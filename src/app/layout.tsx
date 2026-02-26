"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState, createContext } from "react";
import { getTheme } from "@/theme/theme";
import Navbar from "@/components/Navbar";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <html lang="en">
      <head>
        <title>toonkit — Typed Object Notation for APIs</title>
        <meta
          name="description"
          content="Modern data format for APIs. Smaller than JSON, human readable & type-safe."
        />
      </head>
      <body>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
}