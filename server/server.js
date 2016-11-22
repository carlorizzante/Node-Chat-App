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
    console.log("User disconnected.");
  });

  socket.emit("new_email", {
    from: "Jon Snow",
    content: "Wuuuzzaap?",
    createAt: 123 // Long time ago
  });

  socket.on("new_email", data => {
    console.log("New email:", data);
  });

  socket.on("new_message", data => {
    console.log("New message:", data);
  });

  socket.emit("new_message", {
    from: "Server",
    text: "Hello there!"
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
