const http = require("http");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage } = require("./utils/message");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "hbs");

io.on("connection", socket => {
  console.log("User connected.");

  socket.emit("new_message", generateMessage("Admin", "User", "Welcome to the chat."));

  socket.broadcast.emit("new_message", generateMessage("Admin", "User", "New user joined the chat."));

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });

  socket.on("new_message", (message, cb) => {
    io.emit("new_message", generateMessage(message.from, message.to, message.text));
    cb("Server says all good.");
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
