const expect = require("expect");

const { generateMessage, generateLocationLink } = require("./message");

describe("message.js", () => {
  describe("generateMessage", () => {
    it("should generate a message", () => {
      const from = "Jon";
      const text = "Hello there!";
      const createdAt = new Date().getTime();
      const msg = generateMessage(from, text);
      expect(msg).toInclude({ from, text });
      expect(msg.from).toBe(from);
      expect(msg.text).toBe(text);
      expect(msg.createdAt).toBeA("number");
    });
  });

  describe("generateLocationLink", () => {
    it("should generate the current location object", () => {
      const from = "Jon";
      const location = {
        latitude: 55.668042199999995,
        longitude: 12.549437
      }
      const url = `https://google.com/maps?q=${location.latitude},${location.longitude}`;
      const createdAt = new Date().getTime();
      const msg = generateLocationLink(from, location);
      expect(msg).toInclude({ from, url });
      expect(msg.from).toBe(from);
      expect(msg.createdAt).toBeA("number");
    });
  });
});
