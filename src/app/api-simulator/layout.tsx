import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Simulator - Toonkit",
  description:
    "Test Toonkit API simulator - Try real-world API requests with TOON format serialization, see sample payloads, and measure bandwidth savings.",
};

export default function ApiSimulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
