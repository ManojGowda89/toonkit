export const dynamic = "force-static";
export const revalidate = 0;

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://toonkit.js.org/sitemap.xml",
  };
}