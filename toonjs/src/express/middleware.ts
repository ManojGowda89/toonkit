import { createCompressionMiddleware, createTextMiddleware, createRequestMiddleware, type ToonExpressParserOptions } from "./parser";
import { createResponseMiddleware } from "./response";

type RequestHandler = (req: any, res: any, next: (err?: any) => void) => void;

export type ToonExpressOptions = ToonExpressParserOptions;

export function toon(options: ToonExpressOptions = {}): RequestHandler[] {
  const middlewares: RequestHandler[] = [];

  const compressionMiddleware = createCompressionMiddleware(options.compression);
  if (compressionMiddleware) {
    middlewares.push(compressionMiddleware);
  }

  const textMiddleware = createTextMiddleware(options.text);
  if (textMiddleware) {
    middlewares.push(textMiddleware);
  }

  middlewares.push(createRequestMiddleware());
  middlewares.push(createResponseMiddleware());

  return middlewares;
}
