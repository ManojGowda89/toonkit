export const dynamic = "force-static";
export const revalidate = 0;

export default function sitemap() {
  const domains = [
    "https://toonkit.js.org",
    "https://toonkit.manojgowda.in",
  ];
  const pages = ["", "/docs", "/playground", "/api-simulator", "/developer", "/examples"];

  const entries = [];
  for (const domain of domains) {
    for (const page of pages) {
      entries.push({
        url: `${domain}${page}`,
        lastModified: new Date(),
        priority: domain === "https://toonkit.js.org" ? 1.0 : 0.9,
      });
    }
  }

  return entries;
}
