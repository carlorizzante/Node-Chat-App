const moment = require("moment");

const generateMessage = (from, to, text) => {
  return {
    from,
    to,
    text,
    createdAt: moment().valueOf()
  }
}

const generateLocationLink = (from, to, location) => {
  return {
    from,
    to,
    url: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage,
  generateLocationLink
};
