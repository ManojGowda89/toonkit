"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompressionMiddleware = createCompressionMiddleware;
exports.createTextMiddleware = createTextMiddleware;
exports.createRequestMiddleware = createRequestMiddleware;
var compression_1 = __importDefault(require("compression"));
var express_1 = __importDefault(require("express"));
var index_1 = require("../index");
var defaultTextTypes = [
    "text/plain",
    "text/*",
    "application/json",
    "application/toon",
    "application/vnd.toon",
    "application/x-toon"
];
function createCompressionMiddleware(options) {
    if (options === false) {
        return null;
    }
    return (0, compression_1.default)(typeof options === "object" ? options : undefined);
}
function createTextMiddleware(options) {
    if (options === false) {
        return null;
    }
    var textOptions = options && typeof options === "object" ? options : {};
    return express_1.default.text(__assign({ type: defaultTextTypes }, textOptions));
}
function createRequestMiddleware() {
    return function (req, _res, next) {
        // Normalize req.body: if it's a string, try to parse it
        if (typeof req.body === "string") {
            // First try to parse as JSON if it looks like JSON
            if (req.body.trim().startsWith("{") || req.body.trim().startsWith("[")) {
                try {
                    req.body = JSON.parse(req.body);
                }
                catch (_a) {
                    // If JSON parsing fails, try TOON format
                    req.body = (0, index_1.toonToJson)(req.body);
                }
            }
            else {
                // Otherwise treat as TOON format
                req.body = (0, index_1.toonToJson)(req.body);
            }
        }
        // Provide convenience method to parse TOON
        req.toon = function () {
            if (typeof req.body === "string") {
                return (0, index_1.toonToJson)(req.body);
            }
            return req.body;
        };
        next();
    };
}
