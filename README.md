# 📦 toonkit

![npm](https://img.shields.io/npm/v/toonkit)
![downloads](https://img.shields.io/npm/dw/toonkit)
![license](https://img.shields.io/npm/l/toonkit)

**Typed Object Oriented Notation (TOON) parser & serializer**  
for frontend and backend JavaScript applications.

🚀 Lightweight • Type-safe • Human-readable • API-friendly

- 🌐 Docs: https://toonkit.manojgowda.in  
- 💻 Npm: https://www.npmjs.com/package/toonkit  
- 💻 GitHub: https://github.com/ManojGowda89/toonkit  

---

## ✨ Why toonkit?

JSON is powerful but often verbose. **TOON** is designed to be compact, human-readable, and API-friendly.

✅ Smaller payloads  
✅ Human-readable format  
✅ Schema with types  
✅ Multi-resource support  
✅ Frontend ⇄ backend symmetry  
✅ Great for APIs, bots & automation  

---

## 🧠 What is TOON?

**TOON = Typed Object Oriented Notation**

It combines:

- ✔ schema
- ✔ data
- ✔ types
- ✔ compact structure

---

## 🧾 Example TOON

```text
meta{page:n,limit:n,total:n}:
1,10,200

employees[2]{id:n,name:s,salary:n,active:b}:
1,Riya,90000,true
2,John,80000,false

departments[1]{id:s,title:s}:
10,Engineering
```

### 🔄 Parsed JSON Output

```js
{
  meta: { page: 1, limit: 10, total: 200 },

  employees: [
    { id: 1, name: "Riya", salary: 90000, active: true },
    { id: 2, name: "John", salary: 80000, active: false }
  ],

  departments: {
    id: "10",
    title: "Engineering"
  }
}
```

---

## 🧬 Supported Data Types

| Code | Type        | Example |
| ---- | ----------- | ------- |
| `s`  | string      | `Manoj` |
| `n`  | number      | `25` |
| `b`  | boolean     | `true` |
| `nl` | null        | `null` |
| `j`  | JSON object | `{"a":1}` |
| `a`  | array       | `[1,2,3]` |
| `td` | text/date (raw) | `03042026120000` |

> Note: `td` is currently treated as **raw text** in the parser (no automatic Date conversion).

### Example with all supported types

```text
sample{age:n,name:s,active:b,data:j,tags:a,value:nl,created:td}:
25,Manoj,true,{"x":1},["a","b"],null,03042026120000
```

---

## 📥 Installation

```bash
npm install toonkit
```

---

## 🧩 Importing toonkit

### CommonJS

```js
const { sendToon, receiveToon, reqGetToon, resSendToon, toonToJson, jsonToToon } = require("toonkit");
```

### ES Modules

```js
import { sendToon, receiveToon, reqGetToon, resSendToon, toonToJson, jsonToToon } from "toonkit";
```

---

## 🌐 Frontend Usage

### ✅ Convert JSON → TOON

```js
import { sendToon } from "toonkit";

const payload = sendToon({
  employees: [
    { id: 1, name: "Riya", salary: 90000, active: true },
    { id: 2, name: "John", salary: 80000, active: false }
  ]
});
```

### ✅ Send TOON to API

```js
await fetch("/api", {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: payload
});
```

### ✅ Convert TOON → JSON

```js
import { receiveToon } from "toonkit";

const text = await res.text();
const data = receiveToon(text);
```

---

## 🖥 Backend Usage (Express)

### ✅ Setup

```js
const express = require("express");
const { reqGetToon, resSendToon } = require("toonkit");

const app = express();
app.use(express.text()); // required to read TOON as plain text
```

### ✅ Parse & Respond

```js
app.post("/api", (req, res) => {
  const data = reqGetToon(req);
  console.log(data);
  resSendToon(res, data);
});
```

---

## 🧪 Using toonkit in Postman

### Step 1: Method
`POST`

### Step 2: Headers
```
Content-Type: text/plain
```

### Step 3: Body → raw → Text
```text
employees[2]{id:n,name:s,salary:n}:
1,Riya,90000
2,John,80000
```

### Step 4: Send ✅

---

## ✅ Full Real Example (All Types)

### JSON Input

```json
{
  "device_id": "DEVICE_PRO_01",
  "userId": "USER_ABC123",
  "battery": 87,
  "temperature": 36.7,
  "is_active": true,
  "is_charging": false,
  "last_error": null,
  "location": {
    "lat": 12.9716,
    "lng": 77.5946,
    "altitude": 920.5
  },
  "heart_rate_history": [72, 75, 78, 80, 76],
  "activity_log": [
    { "type": "walk", "steps": 1200, "calories": 50 },
    { "type": "run", "steps": 3000, "calories": 180 }
  ],
  "tags": ["iot", "health", "tracker"],
  "config": {
    "mode": "tracking",
    "alerts": {
      "heart": true,
      "fall": false
    }
  },
  "nested_array_test": [
    [1, 2, 3],
    [4, 5, [6, 7]]
  ],
  "created_at": "03042026120000"
}
```

### TOON Output

```text
device_id[1]{0:s}:
DEVICE_PRO_01

userId[1]{0:s}:
USER_ABC123

battery[1]{0:n}:
87

temperature[1]{0:n}:
36.7

is_active[1]{0:b}:
true

is_charging[1]{0:b}:
false

last_error[1]{0:nl}:
null

location[1]{0:j}:
{
  "lat": 12.9716,
  "lng": 77.5946,
  "altitude": 920.5
}

heart_rate_history[1]{0:a}:
[72, 75, 78, 80, 76]

activity_log[1]{0:a}:
[
  { "type": "walk", "steps": 1200, "calories": 50 },
  { "type": "run", "steps": 3000, "calories": 180 }
]

tags[1]{0:a}:
["iot", "health", "tracker"]

config[1]{0:j}:
{
  "mode": "tracking",
  "alerts": {
    "heart": true,
    "fall": false
  }
}

nested_array_test[1]{0:a}:
[
  [1, 2, 3],
  [4, 5, [6, 7]]
]

created_at[1]{0:td}:
03042026120000
```

---

## ⚠️ Important Notes

✔ Enable Express text parser:

```js
app.use(express.text());
```

✔ Use correct header when sending TOON:

```
Content-Type: text/plain
```

✔ For `a` and `j`, the TOON values must be **valid JSON** (because parsing uses `JSON.parse`).

---

## ⚡ Performance Advantage

Compared to JSON:

✔ smaller payload  
✔ faster parsing  
✔ human readable  
✔ API efficient  

---

## 🧠 When to Use toonkit

✅ APIs returning multiple resources  
✅ bots & automation  
✅ low bandwidth systems  
✅ Chrome extensions  
✅ microservices  
✅ admin tools  
✅ data pipelines  

---

## 🤝 Contributing

Contributions are welcome!  
Open PRs or share ideas to improve toonkit.

---

## 👨‍💻 Developer

**Manoj Gowda**  
🌐 https://manojgowda.in

---

## 📄 License

MIT

---

## ✅ Example Express Server (TOON ⇄ JSON)

```js
import express from "express";
import { toonToJson, jsonToToon } from "toonkit";

const app = express();

// Middleware
app.use(express.text());   // for TOON
app.use(express.json());   // for JSON

// TOON → JSON
app.post("/toon", (req, res) => {
  try {
    const toonData = req.body;
    console.log("RAW TOON:\n", toonData);

    const json = toonToJson(toonData);

    console.log("PARSED JSON:\n", { device_id: json.device_id });

    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TOON Parsing failed" });
  }
});

// JSON → TOON
app.post("/json", (req, res) => {
  try {
    const obj = req.body;

    console.log("PARSED JSON:\n", obj);

    const toon = jsonToToon(obj);

    console.log("FORMATTED TOON:\n", toon);

    res.type("text/plain").send(toon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "JSON Conversion failed" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
```