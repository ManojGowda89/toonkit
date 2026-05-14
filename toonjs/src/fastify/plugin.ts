import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import { jsonToToon, toonToJson } from "../index";

declare module "fastify" {
  interface FastifyRequest {
    toon(): any;
  }
  interface FastifyReply {
    toon(body: unknown): this;
  }
}

export type ToonFastifyOptions = {};

const toonPlugin: FastifyPluginAsync<ToonFastifyOptions> = async (fastify) => {
  fastify.decorateRequest("toon", function () {
    if (typeof this.body === "string") {
      return toonToJson(this.body);
    }
    return this.body;
  });

  fastify.decorateReply("toon", function (body: unknown) {
    const payload = typeof body === "string" ? body : jsonToToon(body);
    return this.type("text/plain; charset=utf-8").send(payload);
  });

  const defaultTextTypes = [
    "text/plain",
    "application/toon",
    "application/vnd.toon",
    "application/x-toon",
  ];

  fastify.addContentTypeParser(
    defaultTextTypes,
    { parseAs: "string" },
    function (_req, body, done) {
      try {
        if (typeof body === "string") {
          let parsed;
          if (body.trim().startsWith("{") || body.trim().startsWith("[")) {
            try {
              parsed = JSON.parse(body);
            } catch {
              parsed = toonToJson(body);
            }
          } else {
            parsed = toonToJson(body);
          }
          done(null, parsed);
        } else {
          done(null, body);
        }
      } catch (err) {
        done(err as Error, undefined);
      }
    }
  );
};

export const toon = fp(toonPlugin, {
  name: "toonkit",
  fastify: "5.x",
});
