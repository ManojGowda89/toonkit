export const dynamic = "force-static";
export const revalidate = 0;

export default function sitemap() {
  const urls = [
    "https://toonkit.manojgowda.in",
    "https://toonkit.js.org",
  ];
  const pages = ["", "/docs", "/playground", "/api-simulator", "/developer", "/examples"];

  const entries = [];
  for (const url of urls) {
    for (const page of pages) {
      entries.push({
        url: `${url}${page}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}