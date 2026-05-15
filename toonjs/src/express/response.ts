import type { RequestHandler } from "express-serve-static-core";

import { jsonToToon } from "../index";

declare module "express-serve-static-core" {
  interface Response {
    toon(body: unknown): this;
  }
}

export function createResponseMiddleware(): RequestHandler {
  return (_req, res, next) => {
    res.toon = (body: unknown) => {
      const payload = typeof body === "string" ? body : jsonToToon(body);

      return res.type("text/plain; charset=utf-8").send(payload);
    };

    next();
  };
}
