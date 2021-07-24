const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/indonesia", async (req, res) => {
  const result = await fetch("https://api.kawalcorona.com/indonesia/");
  const items = await result.json();
  res.json(items);
});

app.get("/indonesia/provinces", async (req, res) => {
  const result = await fetch("https://api.kawalcorona.com/indonesia/provinsi/");
  const items = await result.json();
  res.json(items);
});

app.listen(1234, function() {
    console.log("listening on 1234");
});
  