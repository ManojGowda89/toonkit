import { NextResponse, NextRequest } from "next/server";
import { jsonToToon, toonToJson } from "../index";

/**
 * Utility class for creating Next.js responses with TOON formatting.
 */
export class ToonResponse extends NextResponse {
  /**
   * Creates a NextResponse with `application/toon` content type and serialized body.
   * 
   * @param body The JS object or array to serialize.
   * @param init Optional response initialization options (status, headers, etc.)
   */
  static toon(body: any, init?: ResponseInit): NextResponse {
    const toonStr = jsonToToon(body);
    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/toon");

    return new NextResponse(toonStr, {
      ...init,
      headers,
    });
  }
}

/**
 * Helper to parse a NextRequest body automatically depending on its Content-Type.
 * Supports `application/toon` and `application/json`.
 * 
 * @param req The NextRequest object
 */
export async function parseToonRequest(req: NextRequest): Promise<any> {
  const contentType = req.headers.get("content-type") || "";
  
  if (contentType.includes("application/toon")) {
    const text = await req.text();
    return text ? toonToJson(text) : null;
  }
  
  if (contentType.includes("application/json")) {
    const text = await req.text();
    return text ? JSON.parse(text) : null;
  }

  return await req.text();
}
