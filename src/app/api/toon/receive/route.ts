import { receiveToon } from "toonkit";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const text = await req.text();

    if (!text || !text.trim()) {
      return Response.json(
        { error: "Empty TOON payload" },
        { status: 400 }
      );
    }

    const data = receiveToon(text);

    return Response.json(data);
  } catch (err: any) {
    return Response.json(
      { error: err.message || "TOON parse failed" },
      { status: 400 }
    );
  }
}