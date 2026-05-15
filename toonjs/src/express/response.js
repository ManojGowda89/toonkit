"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseMiddleware = createResponseMiddleware;
var index_1 = require("../index");
function createResponseMiddleware() {
    return function (_req, res, next) {
        res.toon = function (body) {
            var payload = typeof body === "string" ? body : (0, index_1.jsonToToon)(body);
            return res.type("text/plain; charset=utf-8").send(payload);
        };
        next();
    };
}
