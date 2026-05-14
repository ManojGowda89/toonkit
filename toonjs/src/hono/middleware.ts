import type { MiddlewareHandler } from "hono";
import { jsonToToon, toonToJson } from "../index";

declare module "hono" {
  interface Context {
    toon(body: unknown): Response;
  }
  interface HonoRequest {
    toon(): Promise<any>;
  }
}

export type ToonHonoOptions = {};

export function toon(_options: ToonHonoOptions = {}): MiddlewareHandler {
  return async (c, next) => {
    c.toon = (body: unknown) => {
      const payload = typeof body === "string" ? body : jsonToToon(body);
      return c.text(payload, 200, {
        "Content-Type": "text/plain; charset=utf-8",
      });
    };

    c.req.toon = async () => {
      const body = await c.req.text();
      if (!body) return undefined;

      if (body.trim().startsWith("{") || body.trim().startsWith("[")) {
        try {
          return JSON.parse(body);
        } catch {
          return toonToJson(body);
        }
      }
      return toonToJson(body);
    };

    await next();
  };
}
