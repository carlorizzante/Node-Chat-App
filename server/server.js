const http = require("http");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");

io.on("connection", socket => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

app.get("/", (req, res) => {
  // res.status(200).render("index.html");
  res.status(200).render("index.hbs", {
    msg: "Server here, saying hi!"
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
