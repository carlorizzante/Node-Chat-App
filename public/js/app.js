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
  const formattedTime = moment(message.createdAt).format("h:mm a");
  console.log(formattedTime);
  const from = message.from;
  const text = message.text
  let new_message = jQuery("<li></li>").text(from + " at " + formattedTime + ": " + text);
  jQuery("#messages").append(new_message);
});

socket.on("new_location", function (message) {
  console.log("Location:", message);
  const from = message.from;
  const url = message.url;
  const formattedTime = moment(message.createdAt).format("h:mm a");
  let new_location = jQuery("<li></li>").text(from + " " + formattedTime + ": ");
  let link = jQuery("<a></a>").attr("href", url).attr("target", "_blank").text("my current location");
  new_location.append(link);
  jQuery("#messages").append(new_location);
});

jQuery("#message-form").on("submit", (event) => {
  // event.stopImmediatePropagation();
  event.preventDefault();
  const messageTextBox = jQuery("#message");
  const username = jQuery("#username").val() || "Anonymous user";
  if(messageTextBox.val().length > 0) {
    socket.emit("new_message", {
      from: username,
      to: "Server",
      text: messageTextBox.val(),
      createdAt: new Date().getTime()
    }, function() {
      messageTextBox.val("");
    });
  }
});

var btnSendLocation = jQuery("#btn-send-location");
btnSendLocation.on("click", function (event) {

  event.preventDefault();

  if (!navigator.geolocation) {
    var notice = jQuery("#notice-geolocation-not-supported");
    return notice.removeClass("hidden");
  }

  btnSendLocation.attr("disabled", "disabled").text("Sharing current location...");

  const notification = jQuery("<li></li>").addClass("shaded").text("Geolocation in progress...");
  jQuery("#messages").append(notification);

  navigator.geolocation.getCurrentPosition(function (position) {
    const user = jQuery("#username").val() || "Anonymous User";
    btnSendLocation.removeAttr("disabled").text("Share current location");
    socket.emit("send_location", {
      user: user,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function () {
      btnSendLocation.removeAttr("disabled").text("Share current location");
    });
  }, function (error) {
    var notice = jQuery("#notice-geolocation-failed");
    notice.removeClass("hidden");
    btnSendLocation.removeAttr("disabled").text("Share current location");
  });
});

var btnClose = jQuery("button.close");
btnClose.on("click", function (event) {
  event.preventDefault();
  console.log("Close!");
  btnClose.parent().addClass("hidden");
});
