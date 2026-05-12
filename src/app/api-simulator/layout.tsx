import type { Metadata } from "next";
import { SEO_DESCRIPTORS, SEO_KEYWORDS } from "../seoKeywords";

export const metadata: Metadata = {
  title: "API Simulator - Toonkit",
  description:
    "Test Toonkit API simulator - Try real-world API requests with TOON format serialization, see sample payloads, and measure bandwidth savings.",
  keywords: SEO_KEYWORDS,
  other: {
    "seo-descriptors": SEO_DESCRIPTORS.join(" | "),
  },
};

export default function ApiSimulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
