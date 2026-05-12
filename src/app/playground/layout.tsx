import type { Metadata } from "next";
import { SEO_DESCRIPTORS, SEO_KEYWORDS } from "../seoKeywords";

export const metadata: Metadata = {
  title: "Playground - Toonkit",
  description:
    "Interactive Toonkit playground - Convert JSON to TOON and vice versa in real-time. Test TOON format with live examples and compression metrics.",
  keywords: SEO_KEYWORDS,
  other: {
    "seo-descriptors": SEO_DESCRIPTORS.join(" | "),
  },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
