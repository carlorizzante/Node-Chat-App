var socket = io();
socket.on("connect", function(message) {
  socket.on("admin_notification", function(message) {
    console.log("Admin:", message);
  });
});

socket.on("disconnect", function() {
  console.log("Connection failed.");
});

// $(document).ready

socket.on("new_message", function(message) {
  console.log("Message:", message);
  const from = message.from;
  const text = message.text
  let new_message = $("<li></li>").text(from + ": " + text);
  console.log(new_message);
  $("#messages").append(new_message);
});

// socket.emit("new_message", {
//   from: "User",
//   to: "Server",
//   text: "Hello Server :)",
//   createdAt: new Date().getTime()
// }, function cb (msg) {
//   console.log(msg);
// });

$("#message-form").on("submit", (event) => {
  const from = $('#username').val();
  const message = $('#message').val();
  event.stopImmediatePropagation();
  event.preventDefault();
  socket.emit("new_message", {
    from: from,
    to: "Server",
    text: message,
    createdAt: new Date().getTime()
  }, function() {});
});
