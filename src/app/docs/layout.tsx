import type { Metadata } from "next";
import { SEO_DESCRIPTORS, SEO_KEYWORDS } from "../seoKeywords";

export const metadata: Metadata = {
  title: "Documentation - Toonkit",
  description:
    "Complete documentation for Toonkit - Learn TOON format, API reference, type codes, and implementation guides for JavaScript/TypeScript.",
  keywords: SEO_KEYWORDS,
  other: {
    "seo-descriptors": SEO_DESCRIPTORS.join(" | "),
  },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
