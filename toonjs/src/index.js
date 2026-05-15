"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeParse = safeParse;
exports.toonToJson = toonToJson;
exports.jsonToToon = jsonToToon;
/* ================= SAFE PARSE ================= */
function safeParse(val) {
    try {
        return JSON.parse(val);
    }
    catch (_a) {
        return val;
    }
}
/* ================= TYPE HELPERS ================= */
function parseValue(val, type) {
    switch (type) {
        case "n":
            return Number(val);
        case "b":
            return val === "true";
        case "j":
        case "a":
            return safeParse(val);
        case "nl":
            return null;
        case "td":
            return val; // timestamp string
        default:
            return val;
    }
}
function getType(val) {
    if (val === null)
        return "nl";
    if (typeof val === "string")
        return "s";
    if (typeof val === "number")
        return "n";
    if (typeof val === "boolean")
        return "b";
    if (Array.isArray(val))
        return "a";
    if (typeof val === "object")
        return "j";
    return "s";
}
function formatValue(val, type) {
    if (type === "a" || type === "j") {
        return JSON.stringify(val, null, 2);
    }
    if (type === "nl")
        return "null";
    return String(val);
}
/* ================= TOON → JSON ================= */
function toonToJson(input) {
    var lines = input.split("\n");
    var obj = {};
    var _loop_1 = function (i) {
        var line = lines[i].trim();
        // Match: key[count]{schema}:
        var match = line.match(/^(.+?)\[(\d+)\]\{(.+)\}:/);
        if (!match)
            return out_i_1 = i, "continue";
        var key = match[1];
        var count = parseInt(match[2]);
        var schemaRaw = match[3];
        // Parse schema
        var fields = schemaRaw.split(",").map(function (f) {
            var _a = f.split(":"), name = _a[0], type = _a[1];
            return { name: name.trim(), type: type.trim() };
        });
        // Collect value lines
        var valueLines = [];
        i++;
        while (i < lines.length) {
            var current = lines[i];
            if (/^(.+?)\[\d+\]\{(.+)\}:/.test(current.trim())) {
                i--;
                break;
            }
            if (current.trim() !== "") {
                valueLines.push(current.trim());
            }
            i++;
        }
        // 🔥 CASE 1: SINGLE VALUE {0:type}
        if (fields.length === 1 && fields[0].name === "0") {
            var rawVal = valueLines[0];
            obj[key] = parseValue(rawVal, fields[0].type);
            return out_i_1 = i, "continue";
        }
        // 🔥 CASE 2: ARRAY OF OBJECTS
        var rows = valueLines.map(function (row) {
            var values = row.split(",");
            var item = {};
            fields.forEach(function (field, idx) {
                item[field.name] = parseValue(values[idx], field.type);
            });
            return item;
        });
        obj[key] = rows;
        out_i_1 = i;
    };
    var out_i_1;
    for (var i = 0; i < lines.length; i++) {
        _loop_1(i);
        i = out_i_1;
    }
    return obj;
}
/* ================= JSON → TOON ================= */
function jsonToToon(obj) {
    var result = "";
    var _loop_2 = function (key) {
        var val = obj[key];
        // 🔥 CASE 1: Primitive → {0:type}
        if (typeof val !== "object" ||
            val === null ||
            !Array.isArray(val)) {
            var type = getType(val);
            result += "".concat(key, "[1]{0:").concat(type, "}:\n");
            result += "".concat(formatValue(val, type), "\n\n");
            return "continue";
        }
        // 🔥 CASE 2: Array of objects
        if (Array.isArray(val) && val.length && typeof val[0] === "object") {
            var fields_1 = Object.keys(val[0]);
            var schema = fields_1
                .map(function (f) { return "".concat(f, ":").concat(getType(val[0][f])); })
                .join(",");
            result += "".concat(key, "[").concat(val.length, "]{").concat(schema, "}:\n");
            val.forEach(function (item) {
                var row = fields_1.map(function (f) { return item[f]; }).join(",");
                result += row + "\n";
            });
            result += "\n";
        }
    };
    for (var key in obj) {
        _loop_2(key);
    }
    return result.trim();
}
