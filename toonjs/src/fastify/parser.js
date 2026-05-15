"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupParser = setupParser;
var index_1 = require("../index");
function setupParser(fastify) {
    fastify.decorateRequest("toon", function () {
        if (typeof this.body === "string") {
            return (0, index_1.toonToJson)(this.body);
        }
        return this.body;
    });
    var defaultTextTypes = [
        "text/plain",
        "application/toon",
        "application/vnd.toon",
        "application/x-toon",
    ];
    fastify.addContentTypeParser(defaultTextTypes, { parseAs: "string" }, function (_req, body, done) {
        try {
            if (typeof body === "string") {
                var parsed = void 0;
                if (body.trim().startsWith("{") || body.trim().startsWith("[")) {
                    try {
                        parsed = JSON.parse(body);
                    }
                    catch (_a) {
                        parsed = (0, index_1.toonToJson)(body);
                    }
                }
                else {
                    parsed = (0, index_1.toonToJson)(body);
                }
                done(null, parsed);
            }
            else {
                done(null, body);
            }
        }
        catch (err) {
            done(err, undefined);
        }
    });
}
