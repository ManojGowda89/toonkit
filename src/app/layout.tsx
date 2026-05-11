import type { Metadata } from "next";

import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Toonkit - Typed Object Oriented Notation",
  description:
    "Toonkit is a compact typed alternative to JSON for JavaScript and Node.js applications.",

  metadataBase: new URL("https://toonkit.js.org"),

  alternates: {
    canonical: "https://toonkit.js.org",
    urls: {
      "en-US": "https://toonkit.js.org",
      "en": "https://toonkit.manojgowda.in",
    },
  },

  openGraph: {
    title: "Toonkit",
    description:
      "Typed Object Oriented Notation parser & serializer for JavaScript/TypeScript.",
    url: "https://toonkit.js.org",
    siteName: "Toonkit",
    type: "website",
    images: ["https://toonkit.js.org/og-image.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Toonkit",
    description: "Compact typed alternative to JSON for JavaScript applications.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://toonkit.js.org" />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
