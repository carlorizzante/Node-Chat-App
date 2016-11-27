const http = require("http");
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const socketIO = require("socket.io");
// const moment = require("moment");

const { generateMessage, generateLocationLink } = require("./utils/message");
const { isRealString } = require("./utils/validate");
const Users = require("./utils/users");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

app.set("view engine", "html");

io.on("connection", socket => {
  // console.log(`${params.name} joined the chat.`);

  socket.on("join", (params, cb) => {

    // io.emit -> io.to("room name").emit
    // socket.broadcast -> socket.broadcast.to("room name").emit
    // socket.emit -> socket.emit // direct line with current user
    // socket.leave("room name") // direct line with current user

    const id = socket.id;
    const name = params.name;
    const room = params.room;

    if (!isRealString(name) || !isRealString(room)) {
      return cb("User name and room name are required.");
    }

    socket.join(room);
    users.removeUser(id); // Removes user from any previous room
    users.addUser(id, name, room); // Add new user to current room

    io.to(room).emit("update_users_list", users.getUsersList(room));

    socket.emit("new_message", generateMessage("Admin", name, `Hello ${name}, welcome to the chat!`));
    socket.broadcast.to(room).emit("new_message", generateMessage("Admin", name, `${name} just joined the chat.`));
    cb(); // Callback function's argument is used for passing errors
  });

  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    // if (!user) return console.log("User can't be removed, not found");
    if (user) {
      const name = user.name;
      const room = user.room;

      io.to(room).emit("update_users_list", users.getUsersList(room));
      io.to(room).emit("new_message", generateMessage("Admin", name, `${name} has left.`));
      console.log("User disconnected.");
    }
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
