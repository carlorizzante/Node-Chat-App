const generateMessage = (from, to, text) => {
  return {
    from,
    to,
    text,
    createdAt: new Date().getTime()
  }
}

const generateLocationLink = (from, to, location) => {
  return {
    from,
    to,
    url: `https://google.com/maps?q=${location.latitude},${location.longitude}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocationLink
};
