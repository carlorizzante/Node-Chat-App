const expect = require("expect");

const { generateMessage, generateLocationLink } = require("./message");

describe("generateMessage", () => {
  it("should generate Admin notification", () => {
    const from = "Admin";
    const to = "User";
    const text = "Hello there!";
    const createdAt = new Date().getTime(); // Timestamp check might fail if the process takes longer
    const msg = generateMessage(from, to, text);
    expect(msg).toInclude({ from, to, text, createdAt }); // See above about Timestamp
    // expect(msg.from).toBe(from);
    // expect(msg.text).toBe(text);
    expect(msg.createdAt).toBeA("number");
  });
});

describe("generateLocationLink", () => {
  it("should generate a corrent location object", () => {
    const from = "Jon";
    const to = "All";
    const location = {
      latitude: 55.668042199999995,
      longitude: 12.549437
    }
    const url = `https://google.com/maps?q=${location.latitude},${location.longitude}`;
    const createdAt = new Date().getTime();
    const msg = generateLocationLink(from, to, location);
    expect(msg).toInclude({from, to, url});
    expect(msg.createdAt).toBeA("number");
  });
});
