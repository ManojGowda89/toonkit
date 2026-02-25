
---

# 📦 toonkit

**Typed Object Oriented Notation (TOON) parser & serializer**
for frontend and backend JavaScript applications.

🚀 Lightweight • Type-safe • Human-readable • API-friendly

🌐 Docs: **[https://toonkit.manojgowda.in](https://toonkit.manojgowda.in)**
💻 GitHub: **[https://github.com/ManojGowda89/toonkit](https://github.com/ManojGowda89/toonkit)**

---

## ✨ Why toonkit?

JSON is powerful but verbose.

**TOON** provides:

✅ smaller payloads
✅ human-readable format
✅ schema with types
✅ multi-resource support
✅ frontend ⇄ backend symmetry
✅ perfect for APIs, bots & automation

---

# 🧠 What is TOON?

TOON = **Typed Object Oriented Notation**

It combines:

✔ schema
✔ data
✔ types
✔ compact structure

---

# 🧾 Example TOON

```text
meta{page:n,limit:n,total:n}:
1,10,200

employees[2]{id:n,name:s,salary:n,active:b}:
1,Riya,90000,true
2,John,80000,false

departments[1]{id:s,title:s}:
10,Engineering
```

---

# 🔄 Parsed JSON Output

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

# 🧬 Supported Data Types

| Code | Type        | Example |
| ---- | ----------- | ------- |
| n    | number      | 25      |
| s    | string      | Manoj   |
| b    | boolean     | true    |
| nl   | null        | null    |
| j    | JSON object | {"a":1} |
| a    | array       | [1,2,3] |

---

## Example With All Types

```text
sample{age:n,name:s,active:b,data:j,tags:a,value:nl}:
25,Manoj,true,{"x":1},["a","b"],null
```

---

# 📥 Installation

```bash
npm install toonkit
```

---

# 🧩 Importing toonkit

### CommonJS

```js
const { sendToon, receiveToon, reqGetToon, resSendToon } = require("toonkit");
```

### ES Modules

```js
import { sendToon, receiveToon, reqGetToon, resSendToon } from "toonkit";
```

---

# 🌐 Frontend Usage

## ✅ Convert JSON → TOON

```js
import { sendToon } from "toonkit";

const payload = sendToon({
  employees: [
    { id: 1, name: "Riya", salary: 90000, active: true },
    { id: 2, name: "John", salary: 80000, active: false }
  ]
});
```

---

## ✅ Send to API

```js
await fetch("/api", {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: payload
});
```

---

## ✅ Convert TOON → JSON

```js
import { receiveToon } from "toonkit";

const text = await res.text();
const data = receiveToon(text);
```

---

# 🖥 Backend Usage (Express)

### Setup

```js
const express = require("express");
const { reqGetToon, resSendToon } = require("toonkit");

const app = express();
app.use(express.text());
```

---

### Parse & Respond

```js
app.post("/api", (req, res) => {

  const data = reqGetToon(req);

  console.log(data);

  resSendToon(res, data);
});
```

---

# 🧪 Using toonkit in Postman

### Step 1: Method

POST

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

### Step 4: Send

---

# 📊 Pagination Example

```js
sendToon({
  meta: { page: 1, limit: 10, total: 200 },
  employees: [...]
});
```

---

# 📦 Multiple Collections Support

```js
sendToon({
  users: [...],
  products: [...],
  orders: [...]
});
```

Perfect for single API responses.

---

# ⚠️ Important Notes

✔ Enable Express text parser:

```js
app.use(express.text());
```

✔ Use correct header:

```
Content-Type: text/plain
```

✔ Schema must match values.

---

# ⚡ Performance Advantage

Compared to JSON:

✔ smaller payload
✔ faster parsing
✔ human readable
✔ API efficient

---

# 🧠 When to Use toonkit

✅ APIs returning multiple resources
✅ bots & automation
✅ low bandwidth systems
✅ Chrome extensions
✅ microservices
✅ admin tools
✅ data pipelines

---

# 👨‍💻 Developer

**Manoj Gowda**
🌐 [https://manojgowda.in](https://manojgowda.in)

---

# 💬 Developer Note

Curious to explore new ideas and build tools that make development easier.

**toonkit** is created to:

✔ save time for developers
✔ simplify data exchange
✔ provide a single function flow for JavaScript lovers
✔ encourage contributions & innovation

---

# 🤝 Contributing

Contributions are welcome!

If you want to improve toonkit, open a PR or share ideas.

Let’s make data exchange simpler together 🚀

---

# 📚 Documentation

Full documentation available at:

👉 [https://toonkit.manojgowda.in](https://toonkit.manojgowda.in)

---

# 💻 Source Code

GitHub Repository:

👉 [https://github.com/ManojGowda89/toonkit](https://github.com/ManojGowda89/toonkit)

---

# 📄 License

MIT

---

# ⭐ If you like toonkit

Give it a star ⭐ and share with developers!

---

