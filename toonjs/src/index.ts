export function safeParse(val: string): any {
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
}

/* ================= TOON → JSON ================= */
export function toonToJson(input: string): any {
  const lines = input.split("\n");
  const obj: any = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    const m = line.match(/^(.+?)\[\d+\]\{(.+)\}:/);
    if (!m) continue;

    const key = m[1];
    const type = m[2].split(":")[1] || "s";

    let valueLines: string[] = [];
    i++;

    while (i < lines.length) {
      const current = lines[i];

      if (/^(.+?)\[\d+\]\{(.+)\}:/.test(current.trim())) {
        i--;
        break;
      }

      if (current.trim() !== "") {
        valueLines.push(current);
      }

      i++;
    }

    let val: any = valueLines.join("\n").trim();

    switch (type) {
      case "b":
        val = val === "true";
        break;
      case "n":
        val = Number(val);
        break;
      case "j":
      case "a":
        val = safeParse(val);
        break;
      case "nl":
        val = null;
        break;
      case "td":
        val = val;
        break;
      default:
        val = val;
    }

    obj[key] = val;
  }

  return obj;
}

/* ================= JSON → TOON ================= */
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

export function jsonToToon(obj: any): string {
  let result = "";

  for (const key in obj) {
    const val = obj[key];
    const type = getType(val);

    result += `${key}[1]{0:${type}}:\n`;
    result += `${formatValue(val, type)}\n\n`;
  }

  return result.trim();
}