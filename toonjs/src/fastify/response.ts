import type { FastifyInstance } from "fastify";
import { jsonToToon } from "../index";

declare module "fastify" {
  interface FastifyReply {
    toon(body: unknown): this;
  }
}

export function setupResponse(fastify: FastifyInstance): void {
  fastify.decorateReply("toon", function (body: unknown) {
    const payload = typeof body === "string" ? body : jsonToToon(body);
    return this.type("text/plain; charset=utf-8").send(payload);
  });
}
