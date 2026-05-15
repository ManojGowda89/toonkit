"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toon = toon;
var parser_1 = require("./parser");
var response_1 = require("./response");
function toon(options) {
    if (options === void 0) { options = {}; }
    var middlewares = [];
    var compressionMiddleware = (0, parser_1.createCompressionMiddleware)(options.compression);
    if (compressionMiddleware) {
        middlewares.push(compressionMiddleware);
    }
    var textMiddleware = (0, parser_1.createTextMiddleware)(options.text);
    if (textMiddleware) {
        middlewares.push(textMiddleware);
    }
    middlewares.push((0, parser_1.createRequestMiddleware)());
    middlewares.push((0, response_1.createResponseMiddleware)());
    return middlewares;
}
