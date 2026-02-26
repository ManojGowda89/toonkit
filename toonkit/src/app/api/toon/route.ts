import { receiveToon, sendToon } from "toonkit";

export async function POST(req: Request) {
  const start = performance.now();

  const text = await req.text();
  const json = receiveToon(text);
  const toon = sendToon(json);

  const end = performance.now();

  return new Response(toon, {
    headers: {
      "Content-Type": "text/plain",
      "X-Processing-Time": (end - start).toFixed(2),
    },
  });
}