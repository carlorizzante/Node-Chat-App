const http = require("http");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const socketIO = require("socket.io");
// const moment = require("moment");

const { generateMessage, generateLocationLink } = require("./utils/message");
const { isRealString } = require("./utils/validate");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

app.set("view engine", "html");

io.on("connection", socket => {
  // console.log(`${params.name} joined the chat.`);

  socket.on("join", (params, cb) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      cb("User name and room name are required.");
    }
    cb(); // Callback function's argument is used for passing errors
  });

  socket.emit("new_message", generateMessage("Admin", "User", "Welcome to the chat."));

  socket.broadcast.emit("new_message", generateMessage("Admin", "User", "New user joined the chat."));

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });

  socket.on("new_message", (message, cb) => {
    io.emit("new_message", generateMessage(message.from, message.to, message.text));
    cb();
  });

  socket.on("send_location", (location, cb) => {
    const user = location.user;
    const message = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    // io.emit("new_message", generateMessage(user, "All", message));
    io.emit("new_location", generateLocationLink(user, "All", location));
    cb();
  });
});

app.get("/", (req, res) => {
  // res.status(200).render("index.html");
  res.status(200).render();
});

// app.get("/chat", (req, res) => {
//   res.status(200).render("chat.html");
// });

server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
