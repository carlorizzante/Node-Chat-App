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
  let new_message = jQuery("<li></li>").text(from + ": " + text);
  jQuery("#messages").append(new_message);
});

socket.on("new_location", function (message) {
  console.log("Location:", message);
  const from = message.from;
  const url = message.url
  let new_location = jQuery("<li></li>");
  let link = jQuery("<a target='_blank'>" + from + "'s sharing his/her current geolocation.</a>").attr("href", url);
  new_location.append(link);
  // new_location.text(link);
  jQuery("#messages").append(new_location);
});

jQuery("#message-form").on("submit", (event) => {
  const from = jQuery('#username').val();
  const message = jQuery('#message').val();
  event.stopImmediatePropagation();
  event.preventDefault();
  socket.emit("new_message", {
    from: from,
    to: "Server",
    text: message,
    createdAt: new Date().getTime()
  }, function() {});
});

var btnSendLocation = jQuery("#btn-send-location");
btnSendLocation.on("click", function (event) {

  event.preventDefault();

  if (!navigator.geolocation) {
    var notice = jQuery("#notice-geolocation-not-supported");
    return notice.removeClass("hidden");
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log("Geolocating...", position);
    const user = jQuery("#username").val();
    socket.emit("send_location", {
      user: user,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (error) {
    var notice = jQuery("#notice-geolocation-failed");
    notice.removeClass("hidden");
  });
});

var btnClose = jQuery("button.close");
btnClose.on("click", function (event) {
  event.preventDefault();
  console.log("Close!");
  btnClose.parent().addClass("hidden");
});
