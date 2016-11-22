var socket = io();
socket.on("connect", function() {
  console.log("Connected to server.");
});

socket.on("disconnect", function() {
  console.log("Connection failed.");
});

socket.on("new_message", function(data) {
  console.log("New message!", data);
});
