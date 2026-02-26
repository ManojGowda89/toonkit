import { sendToon, receiveToon } from "toonkit";

function size(str: string) {
  return new Blob([str]).size;
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";

  const start = performance.now();

  try {
    // ───── JSON INPUT ─────
    if (contentType.includes("application/json")) {
      const json = await req.json();

      const jsonStr = JSON.stringify(json);
      const toon = sendToon(json);
      const roundTrip = receiveToon(toon);

      const end = performance.now();

      return Response.json({
        input: "json",
        json,
        toon,
        roundTrip,
        benchmark: {
          jsonSize: size(jsonStr),
          toonSize: size(toon),
          savedBytes: size(jsonStr) - size(toon),
          savedPercent: (
            ((size(jsonStr) - size(toon)) / size(jsonStr)) *
            100
          ).toFixed(1),
          timeMs: (end - start).toFixed(2),
        },
      });
    }

    // ───── TOON INPUT ─────
    const toonText = await req.text();
    const json = receiveToon(toonText);
    const toonRound = sendToon(json);

    const end = performance.now();

    return Response.json({
      input: "toon",
      json,
      toon: toonRound,
      benchmark: {
        toonSize: size(toonText),
        jsonSize: size(JSON.stringify(json)),
        timeMs: (end - start).toFixed(2),
      },
    });

  } catch {
    return Response.json({ error: "Conversion failed" }, { status: 400 });
  }
}