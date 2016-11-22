var socket = io();
socket.on("connect", function(message) {
  socket.on("admin_notification", function(message) {
    console.log("Admin:", message);
  });
});

socket.on("disconnect", function() {
  console.log("Connection failed.");
});

socket.on("new_message", function(message) {
  console.log("Message:", message);
});
