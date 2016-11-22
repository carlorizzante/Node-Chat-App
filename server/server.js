const express = require("express");
const path = require("path");
const hbs = require("hbs");

const publicPath = path.join(__dirname, "../public");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.status(200).render("index.html");
  // res.status(200).render("index.hbs", {
  //   msg: "Server here, saying hi!"
  // });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
