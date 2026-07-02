const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ConnectPro API Running");
});

module.exports = app;