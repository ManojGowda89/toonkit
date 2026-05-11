import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground - Toonkit",
  description:
    "Interactive Toonkit playground - Convert JSON to TOON and vice versa in real-time. Test TOON format with live examples and compression metrics.",
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
