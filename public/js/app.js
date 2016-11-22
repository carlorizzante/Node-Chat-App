var socket = io();
socket.on("connect", function() {
  console.log("Connected to server.");

  socket.emit("new_email", {
    to: "Janet",
    content: "Hello darling!",
    scheduled: 1234
  });

  socket.emit("new_message", {
    to: "Everyone",
    text: "Hello folks!"
  });
});

socket.on("disconnect", function() {
  console.log("Connection failed.");
});

socket.on("new_email", function(data) {
  console.log("New email!", data);
});

socket.on("new_message", function(data) {
  console.log("New message!", data);
});
