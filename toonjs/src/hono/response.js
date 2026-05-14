"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupResponseHandler = setupResponseHandler;
var index_1 = require("../index");
function setupResponseHandler(c) {
    c.toon = function (body) {
        var payload = typeof body === "string" ? body : (0, index_1.jsonToToon)(body);
        return c.text(payload, 200, {
            "Content-Type": "text/plain; charset=utf-8",
        });
    };
}
