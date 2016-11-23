const expect = require("expect");

const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate Admin notification", () => {
    const from = "Admin";
    const to = "User"
    const text = "Hello there!";
    const createdAt = new Date().getTime(); // Timestamp check might fail if the process takes longer
    const msg = generateMessage(from, to, text);
    expect(msg).toInclude({ from, to, text, createdAt }); // See above about Timestamp
    // expect(msg.from).toBe(from);
    // expect(msg.text).toBe(text);
    expect(msg.createdAt).toBeA("number");
  });
});
