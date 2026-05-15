"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupResponse = setupResponse;
var index_1 = require("../index");
function setupResponse(fastify) {
    fastify.decorateReply("toon", function (body) {
        var payload = typeof body === "string" ? body : (0, index_1.jsonToToon)(body);
        return this.type("text/plain; charset=utf-8").send(payload);
    });
}
