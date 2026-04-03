/* ================= SAFE PARSE ================= */
export function safeParse(val: string): any {
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
}

/* ================= TYPE HELPERS ================= */
function parseValue(val: string, type: string): any {
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

function getType(val: any): string {
  if (val === null) return "nl";
  if (typeof val === "string") return "s";
  if (typeof val === "number") return "n";
  if (typeof val === "boolean") return "b";
  if (Array.isArray(val)) return "a";
  if (typeof val === "object") return "j";
  return "s";
}

function formatValue(val: any, type: string): string {
  if (type === "a" || type === "j") {
    return JSON.stringify(val, null, 2);
  }
  if (type === "nl") return "null";
  return String(val);
}

/* ================= TOON → JSON ================= */
export function toonToJson(input: string): any {
  const lines = input.split("\n");
  const obj: any = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Match: key[count]{schema}:
    const match = line.match(/^(.+?)\[(\d+)\]\{(.+)\}:/);
    if (!match) continue;

    const key = match[1];
    const count = parseInt(match[2]);
    const schemaRaw = match[3];

    // Parse schema
    const fields = schemaRaw.split(",").map((f) => {
      const [name, type] = f.split(":");
      return { name: name.trim(), type: type.trim() };
    });

    // Collect value lines
    let valueLines: string[] = [];
    i++;

    while (i < lines.length) {
      const current = lines[i];

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
      const rawVal = valueLines[0];
      obj[key] = parseValue(rawVal, fields[0].type);
      continue;
    }

    // 🔥 CASE 2: ARRAY OF OBJECTS
    const rows = valueLines.map((row) => {
      const values = row.split(",");
      const item: any = {};

      fields.forEach((field, idx) => {
        item[field.name] = parseValue(values[idx], field.type);
      });

      return item;
    });

    obj[key] = rows;
  }

  return obj;
}

/* ================= JSON → TOON ================= */
export function jsonToToon(obj: any): string {
  let result = "";

  for (const key in obj) {
    const val = obj[key];

    // 🔥 CASE 1: Primitive → {0:type}
    if (
      typeof val !== "object" ||
      val === null ||
      !Array.isArray(val)
    ) {
      const type = getType(val);

      result += `${key}[1]{0:${type}}:\n`;
      result += `${formatValue(val, type)}\n\n`;
      continue;
    }

    // 🔥 CASE 2: Array of objects
    if (Array.isArray(val) && val.length && typeof val[0] === "object") {
      const fields = Object.keys(val[0]);

      const schema = fields
        .map((f) => `${f}:${getType(val[0][f])}`)
        .join(",");

      result += `${key}[${val.length}]{${schema}}:\n`;

      val.forEach((item: any) => {
        const row = fields.map((f) => item[f]).join(",");
        result += row + "\n";
      });

      result += "\n";
    }
  }

  return result.trim();
}