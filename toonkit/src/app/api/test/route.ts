import { sendToon, receiveToon } from "toonkit";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jsonParam = searchParams.get("json");
  const toonParam = searchParams.get("toon");

  try {
    if (jsonParam) {
      const json = JSON.parse(jsonParam);
      const toon = sendToon(json);

      return Response.json({
        input: "json",
        json,
        toon,
        jsonSize: jsonParam.length,
        toonSize: toon.length,
        savedBytes: jsonParam.length - toon.length,
      });
    }

    if (toonParam) {
      const json = receiveToon(toonParam);
      const toon = sendToon(json);

      return Response.json({
        input: "toon",
        json,
        toon,
        toonSize: toonParam.length,
      });
    }

    return Response.json({
      message: "Provide ?json= or ?toon=",
    });

  } catch (err) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }
}