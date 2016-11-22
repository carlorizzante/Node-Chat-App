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

  socket.emit("admin_notification", generateMessage("Admin", "Welcome to the chat."));

  socket.broadcast.emit("admin_notification", generateMessage("Admin", "New user joined the chat."));

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });

  socket.on("new_message", message => {
    io.emit("new_message", generateMessage(message.from, message.text));
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
