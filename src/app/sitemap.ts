export default function sitemap() {
  const baseUrl = "https://toonkit.manojgowda.in";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/playground`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/api-simulator`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/developer`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: new Date(),
    },
  ];
}