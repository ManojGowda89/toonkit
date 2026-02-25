/* =========================================
   TOONJS - Typed Object Oriented Notation
   Full Production Version
========================================= */

/* =========================================
   TYPE HELPERS
========================================= */

function detectType(value) {
  if (value === null) return "nl";
  if (Array.isArray(value)) return "a";
  if (typeof value === "number") return "n";
  if (typeof value === "boolean") return "b";
  if (typeof value === "object") return "j";
  return "s";
}

function castValue(value, type) {
  switch (type) {
    case "n": return Number(value);
    case "b": return value === "true";
    case "nl": return null;
    case "j": return JSON.parse(value);
    case "a": return JSON.parse(value);
    case "s":
    default: return value;
  }
}

/* =========================================
   JSON ➜ TOON
========================================= */

function jsonToToon(data) {
  if (!data || typeof data !== "object") {
    throw new Error("sendToon expects an object");
  }

  let output = "";

  for (const collection in data) {
    const value = data[collection];

    const records = Array.isArray(value) ? value : [value];

    if (!records.length) continue;

    const headers = Object.keys(records[0]);

    const schema = headers
      .map(h => `${h}:${detectType(records[0][h])}`)
      .join(",");

    const rows = records
      .map(r =>
        headers
          .map(h => {
            const val = r[h];
            if (typeof val === "object" && val !== null) {
              return JSON.stringify(val);
            }
            return val;
          })
          .join(",")
      )
      .join("\n");

    output += `${collection}[${records.length}]{${schema}}:\n${rows}\n\n`;
  }

  return output.trim();
}

/* =========================================
   TOON ➜ JSON
========================================= */

function toonToJson(input) {
  if (!input || typeof input !== "string") {
    throw new Error("receiveToon expects a string");
  }

  const lines = input.split("\n").map(l => l.trim());

  const result = {};
  let currentCollection = null;
  let headers = [];
  let types = [];

  lines.forEach(line => {
    if (!line) return;

    // Schema line
    if (line.includes("{") && line.includes("}")) {
      currentCollection = line.split("{")[0].split("[")[0].trim();

      const schemaParts = line
        .split("{")[1]
        .split("}")[0]
        .split(",")
        .map(s => s.trim());

      headers = schemaParts.map(s => s.split(":")[0]);
      types = schemaParts.map(s => s.split(":")[1] || "s");

      result[currentCollection] = [];
      return;
    }

    // Data rows
    if (currentCollection && line.includes(",")) {
      const values = line.split(",").map(v => v.trim());

      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = castValue(values[i], types[i]);
      });

      result[currentCollection].push(obj);
    }
  });

  // Convert single record arrays to object
  for (const key in result) {
    if (result[key].length === 1) {
      result[key] = result[key][0];
    }
  }

  return result;
}

/* =========================================
   FRONTEND FUNCTIONS
========================================= */

// JSON ➜ TOON
function sendToon(jsonData) {
  return jsonToToon(jsonData);
}

// TOON ➜ JSON
function receiveToon(toonString) {
  return toonToJson(toonString);
}

/* =========================================
   BACKEND EXPRESS HELPERS
========================================= */

// Parse incoming request
function reqGetToon(req) {
  if (!req || !req.body) {
    throw new Error("reqGetToon expects Express request with text body");
  }
  return toonToJson(req.body);
}

// Send TOON response
function resSendToon(res, jsonData) {
  if (!res) {
    throw new Error("resSendToon expects Express response object");
  }
  const toon = jsonToToon(jsonData);
  res.type("text/plain").send(toon);
}

/* =========================================
   EXPORTS (CommonJS + ESM)
========================================= */

const toonjs = {
  sendToon,
  receiveToon,
  reqGetToon,
  resSendToon
};

// CommonJS
if (typeof module !== "undefined" && module.exports) {
  module.exports = toonjs;
}

// ES Modules
export {
  sendToon,
  receiveToon,
  reqGetToon,
  resSendToon
};