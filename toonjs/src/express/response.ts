import { jsonToToon } from "../index";

type RequestHandler = (req: any, res: any, next: (err?: any) => void) => void;

export function createResponseMiddleware(): RequestHandler {
  return (_req, res, next) => {
    res.toon = (body: unknown) => {
      const payload = typeof body === "string" ? body : jsonToToon(body);

      return res.type("text/plain; charset=utf-8").send(payload);
    };

    next();
  };
}
