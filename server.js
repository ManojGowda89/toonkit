const express = require("express");
const { toonToJson, sendToon } = require("./toon");

const app = express();
app.use(express.text());

let employees = [];


app.post("/employees", (req, res) => {
  try {
    const parsed = toonToJson(req.body);

    const records = Array.isArray(parsed.data)
      ? parsed.data
      : [parsed.data];

    employees.push(...records);

   
    sendToon(res, "employees", employees);

  } catch (err) {
    res.send("status=error;message=invalid toon");
  }
});




app.listen(5000, () => console.log("Server running"));