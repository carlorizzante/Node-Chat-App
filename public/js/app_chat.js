"use strict";

var socket = io();

socket.on("connect", function(message) {
  const params = jQuery.deparam(window.location.search);

  socket.emit("join", params, function (err) {
    if (err) {
      alert(err);
      return window.location.href = "/";
    }
  });
});

socket.on("disconnect", function() {
  console.log("Connection failed.");
});

// $(document).ready

socket.on("new_message", function(message) {
  // Basic jQuery method
  // const formattedTime = moment(message.createdAt).format("h:mm a");
  // console.log(formattedTime);
  // const from = message.from;
  // const text = message.text
  // let new_message = jQuery("<li></li>").text(from + " at " + formattedTime + ": " + text);
  // jQuery("#messages").append(new_message);

  // Mustache templating
  const formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  scrollToBottom();
});

socket.on("new_location", function (message) {
  // const from = message.from;
  // const url = message.url;
  // const formattedTime = moment(message.createdAt).format("h:mm a");
  // let new_location = jQuery("<li></li>").text(from + " " + formattedTime + ": ");
  // let link = jQuery("<a></a>").attr("href", url).attr("target", "_blank").text("my current location");
  // new_location.append(link);
  // jQuery("#messages").append(new_location);

  const formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#location-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  scrollToBottom();
});

socket.on("update_users_list", function(users) {
  let ul = jQuery("<ul></ul>");
  users.forEach(function(user) {
    ul.append(jQuery("<li></li>").text(user));
  });
  jQuery("#users").html(ul);
});

jQuery("#message-form").on("submit", (event) => {
  // event.stopImmediatePropagation();
  event.preventDefault();
  const messageTextBox = jQuery("#message");
  if(messageTextBox.val().length > 0) {
    socket.emit("new_message", {
      text: messageTextBox.val()
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
  scrollToBottom();

  navigator.geolocation.getCurrentPosition(function (position) {
    btnSendLocation.removeAttr("disabled").text("Share current location");
    socket.emit("send_location", {
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

function scrollToBottom() {
  // Selectors
  var messages = jQuery("#messages");
  var newMessage = jQuery("#messages li:last-child");
  // Heights
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  // Math
  if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}
