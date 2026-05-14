import type { MiddlewareHandler } from "hono";
import { setupRequestParser } from "./parser";
import { setupResponseHandler } from "./response";

export type ToonHonoOptions = {};

export function toon(_options: ToonHonoOptions = {}): MiddlewareHandler {
  return async (c, next) => {
    setupResponseHandler(c);
    setupRequestParser(c);
    await next();
  };
}
