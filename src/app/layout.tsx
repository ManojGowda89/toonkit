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
        {/* ⭐ BASIC SEO */}
        <title>toonkit — Typed Object Notation for APIs</title>

        <meta
          name="description"
          content="TOON (Typed Object Oriented Notation) is a smaller, type-safe, human-readable alternative to JSON built for modern APIs and developer tools."
        />

        <meta
          name="keywords"
          content="toonkit, TOON format, JSON alternative, API data format, typed notation, lightweight API format, developer tools, serialization"
        />

        <meta name="author" content="Manoj Gowda" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* ⭐ MOBILE & PERFORMANCE */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />

        {/* ⭐ CANONICAL URL */}
        <link rel="canonical" href="https://toonkit.manojgowda.in" />

        {/* ⭐ FAVICON & APP ICONS */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />

        {/* ⭐ OPEN GRAPH (WhatsApp, LinkedIn, Facebook) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="toonkit — Typed Object Notation" />
        <meta
          property="og:description"
          content="Smaller than JSON. Type-safe. Human-readable. Built for modern APIs."
        />
        <meta property="og:url" content="https://toonkit.manojgowda.in" />
        <meta property="og:site_name" content="toonkit" />
        <meta
          property="og:image"
          content="https://toonkit.manojgowda.in/og-image.png"
        />
        <meta property="og:locale" content="en_US" />

        {/* ⭐ TWITTER PREVIEW */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="toonkit — JSON Alternative for APIs" />
        <meta
          name="twitter:description"
          content="A smaller, type-safe alternative to JSON designed for modern APIs."
        />
        <meta
          name="twitter:image"
          content="https://toonkit.manojgowda.in/og-image.png"
        />
        <meta name="twitter:creator" content="@manojgowda" />

        {/* ⭐ GEO / LANGUAGE SIGNALS */}
        <meta httpEquiv="content-language" content="en" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />

        {/* ⭐ PREFETCH DNS (PERFORMANCE BOOST) */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* ⭐ STRUCTURED DATA FOR GOOGLE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "toonkit",
              applicationCategory: "DeveloperTool",
              operatingSystem: "Any",
              description:
                "Typed Object Oriented Notation parser & serializer for modern APIs.",
              author: {
                "@type": "Person",
                name: "Manoj Gowda",
                url: "https://manojgowda.in",
              },
              url: "https://toonkit.manojgowda.in",
            }),
          }}
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