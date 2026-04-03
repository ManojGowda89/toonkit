# 📦 toonkit

![npm](https://img.shields.io/npm/v/toonkit)
![downloads](https://img.shields.io/npm/dw/toonkit)
![license](https://img.shields.io/npm/l/toonkit)

**Typed Object Oriented Notation (TOON) parser & serializer** for JavaScript/TypeScript.

This package provides **two main functions**:

- `toonToJson(toon: string)` → converts **TOON text** into **JSON**
- `jsonToToon(obj: any)` → converts **JSON** into **TOON text**

Docs: https://toonkit.manojgowda.in  
NPM: https://www.npmjs.com/package/toonkit  
GitHub: https://github.com/ManojGowda89/toonkit

---

## ✨ Why TOON?

JSON is great, but can be verbose. **TOON** is designed to be:

- ✅ Compact payloads
- ✅ Human-readable
- ✅ Type-aware (via schema/type codes)
- ✅ Good for APIs and automation

---

## 📥 Installation

```bash
npm install toonkit
```

---

## 📦 Import

### ES Modules
```js
import { toonToJson, jsonToToon } from "toonkit";
```

### CommonJS
```js
const { toonToJson, jsonToToon } = require("toonkit");
```

---

## 🔁 Function 1: `toonToJson(input: string)`

### ✅ What it does
Parses TOON formatted text and returns a JavaScript object.

### ✅ Supported type codes (based on your implementation)

| Type | Meaning | Example TOON value | Output in JSON |
|------|---------|--------------------|----------------|
| `s`  | string  | `Manoj` | `"Manoj"` |
| `n`  | number  | `36.7` | `36.7` |
| `b`  | boolean | `true` | `true` |
| `nl` | null    | `null` | `null` |
| `j`  | JSON object | `{ "a": 1 }` | `{ a: 1 }` |
| `a`  | array | `[1,2,3]` | `[1,2,3]` |
| `td` | raw text/date (no parsing) | `03042026120000` | `"03042026120000"` |

> Notes:
> - `j` and `a` must be **valid JSON strings**, because parsing uses `JSON.parse`.
> - `b` is parsed using `val === "true"` (case-sensitive).

### ✅ Example (TOON → JSON)

**TOON Input**
```text
device_id[1]{0:s}:
DEVICE_PRO_01

battery[1]{0:n}:
87

is_active[1]{0:b}:
true

last_error[1]{0:nl}:
null

location[1]{0:j}:
{
  "lat": 12.9716,
  "lng": 77.5946
}

tags[1]{0:a}:
["iot", "health"]

created_at[1]{0:td}:
03042026120000
```

**JSON Output**
```js
{
  device_id: "DEVICE_PRO_01",
  battery: 87,
  is_active: true,
  last_error: null,
  location: { lat: 12.9716, lng: 77.5946 },
  tags: ["iot", "health"],
  created_at: "03042026120000"
}
```

---

## 🔁 Function 2: `jsonToToon(obj: any)`

### ✅ What it does
Serializes a JavaScript object into TOON format.

### ✅ How types are detected
Your `getType()` function maps values like this:

- `null` → `nl`
- `string` → `s`
- `number` → `n`
- `boolean` → `b`
- `array` → `a`
- `object` → `j`

> Note: Since JavaScript dates are usually strings (or `Date` objects), your current serializer will treat:
> - `"03042026120000"` as `s`
> - `new Date()` as `j` (because it’s an object) unless you handle it separately.

### ✅ Example (JSON → TOON)

**JSON Input**
```js
const obj = {
  device_id: "DEVICE_PRO_01",
  battery: 87,
  temperature: 36.7,
  is_active: true,
  last_error: null,
  location: { lat: 12.9716, lng: 77.5946 },
  tags: ["iot", "health", "tracker"]
};
```

**TOON Output**
```text
device_id[1]{0:s}:
DEVICE_PRO_01

battery[1]{0:n}:
87

temperature[1]{0:n}:
36.7

is_active[1]{0:b}:
true

last_error[1]{0:nl}:
null

location[1]{0:j}:
{
  "lat": 12.9716,
  "lng": 77.5946
}

tags[1]{0:a}:
[
  "iot",
  "health",
  "tracker"
]
```

---

## 🖥 Express Example (TOON ⇄ JSON)

```js
import express from "express";
import { toonToJson, jsonToToon } from "toonkit";

const app = express();

// Needed to accept TOON as plain text
app.use(express.text());

// Needed to accept JSON body
app.use(express.json());

// TOON → JSON
app.post("/toon", (req, res) => {
  try {
    const json = toonToJson(req.body);
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: "TOON Parsing failed" });
  }
});

// JSON → TOON
app.post("/json", (req, res) => {
  try {
    const toon = jsonToToon(req.body);
    res.type("text/plain").send(toon);
  } catch (err) {
    res.status(500).json({ error: "JSON Conversion failed" });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
```

### Postman (TOON endpoint)
- Method: `POST`
- URL: `http://localhost:3000/toon`
- Header:
  ```
  Content-Type: text/plain
  ```
- Body → raw → Text:
  ```text
  device_id[1]{0:s}:
  DEVICE_PRO_01
  ```

---

## 📄 License

MIT