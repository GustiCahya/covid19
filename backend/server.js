const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/indonesia", async (req, res) => {
  try {
    const result = await fetch("https://api.kawalcorona.com/indonesia/");
    const items = await result.json();
    res.json(items);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/indonesia/provinces", async (req, res) => {
  try {
    const result = await fetch(
      "https://api.kawalcorona.com/indonesia/provinsi/"
    );
    const items = await result.json();
    res.json(items);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/indonesia/updatedData", async (req, res) => {
  try {
    const result = await fetch(
      "https://data.covid19.go.id/public/api/update.json"
    );
    const item = await result.json();
    const updatedData = item.update;
    res.json(updatedData);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/indonesia/hospitals", async (req, res) => {
  try {
    const result = await fetch(
      "https://dekontaminasi.com/api/id/covid19/hospitals"
    );
    const item = await result.json();
    res.json(item);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(1234, function () {
  console.log("listening on 1234");
});
