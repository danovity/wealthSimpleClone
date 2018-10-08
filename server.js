const express = require("express");
const bodyParser = require("body-parser");
const grabity = require("grabity");
const PORT = 8080; // default port 8080
//Setup express app
const app = express();

//Setup middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.set("view options", { layout: false });
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("index.html");
});

app.post("/articles", (req, res) => {
  let url = req.body.url;

  (async () => {
    let content = await grabity.grabIt(url);

    res.send(content);
  })();
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

module.exports = app;
