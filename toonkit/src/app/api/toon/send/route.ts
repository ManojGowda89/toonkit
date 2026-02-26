import { sendToon } from "toonkit";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const toon = sendToon(json);

    return new Response(toon, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Invalid JSON" }),
      { status: 400 }
    );
  }
}