var socket = io();
socket.on("connect", function(data) {
  socket.on("admin_notification", function(data) {
    console.log("Admin:", data);
  });
});

socket.on("disconnect", function() {
  console.log("Connection failed.");
});

socket.on("new_message", function(data) {
  console.log("Message:", data);
});
