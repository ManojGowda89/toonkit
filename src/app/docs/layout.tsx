import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - Toonkit",
  description:
    "Complete documentation for Toonkit - Learn TOON format, API reference, type codes, and implementation guides for JavaScript/TypeScript.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
