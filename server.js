"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

let grabity = require("grabity");

if (process.env.ENV === "production") {
  app.use(express.static("client/build"));
}

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  }),
  cors()
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

app.set("view options", { layout: false });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

app.post("/articles", (req, res) => {
  let url = req.body.url;

  (async () => {
    try {
      let it = await grabity.grabIt(url);

      console.log(it);
      res.send(it);
    } catch (error) {}
  })();
});
