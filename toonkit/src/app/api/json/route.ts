export async function POST(req: Request) {
  const start = performance.now();

  const data = await req.json();

  const end = performance.now();

  return Response.json({
    data,
    size: JSON.stringify(data).length,
    processingMs: (end - start).toFixed(2),
  });
}