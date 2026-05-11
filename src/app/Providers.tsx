"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo, useState, createContext, useEffect } from "react";
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

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const host = window.location.host;
      const REDIRECT_FLAG = "__tk_redirect_prompt_shown";
      if (host === "toonkit.manojgowda.in" && !localStorage.getItem(REDIRECT_FLAG)) {
        const message =
          "This site is also available at the official domain https://toonkit.js.org. Click OK to go there now, or Cancel to stay.";
        const ok = window.confirm(message);
        try {
          localStorage.setItem(REDIRECT_FLAG, "1");
        } catch (e) {
          // ignore storage errors
        }
        if (ok) {
          const url = `https://toonkit.js.org${window.location.pathname}${window.location.search}${window.location.hash}`;
          window.location.href = url;
        }
      }
    } catch (e) {
      // fail silently
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AppRouterCacheProvider options={{ key: "mui" }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </ColorModeContext.Provider>
  );
}
