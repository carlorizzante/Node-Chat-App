const moment = require("moment");

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const generateLocationLink = (from, location) => {
  return {
    from,
    url: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage,
  generateLocationLink
};
