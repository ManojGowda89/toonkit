export const dynamic = "force-static";
export const revalidate = 0;

export default function sitemap() {
  return [
    {
      url: "https://toonkit.js.org",
      lastModified: new Date(),
    },
  ];
}