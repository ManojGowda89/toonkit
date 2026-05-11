import type { Metadata } from "next";

import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Toonkit - Typed Object Oriented Notation",
  description:
    "Toonkit is a compact typed alternative to JSON for JavaScript and Node.js applications.",

  metadataBase: new URL("https://toonkit.js.org"),

  alternates: {
    canonical: "https://toonkit.js.org",
  },

  openGraph: {
    title: "Toonkit",
    description:
      "Typed Object Oriented Notation parser & serializer for JavaScript/TypeScript.",
    url: "https://toonkit.js.org",
    siteName: "Toonkit",
    type: "website",
    images: [
      {
        url: "https://toonkit.js.org/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Toonkit Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Toonkit",
    description: "Compact typed alternative to JSON for JavaScript applications.",
    images: ["https://toonkit.js.org/logo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="EUYBWEqpv0cLfawOccM6itH9lGC4nYmBsiuiHn69pTU"
        />
        <link rel="canonical" href="https://toonkit.js.org" />
        <link rel="icon" type="image/jpeg" href="/logo.jpg" />
        <link rel="apple-touch-icon" href="/logo.jpg" />

        {/* Structured Data (JSON-LD) for Organization & SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Toonkit",
              alternateName: "TOON - Typed Object Oriented Notation",
              description:
                "Compact typed alternative to JSON for JavaScript and Node.js applications",
              url: "https://toonkit.js.org",
              logo: "https://toonkit.js.org/logo.jpg",
              image: "https://toonkit.js.org/logo.jpg",
              applicationCategory: "DeveloperTool",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "Manoj Gowda",
                url: "https://manojgowda.in",
              },
            }),
          }}
        />
      </head>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
