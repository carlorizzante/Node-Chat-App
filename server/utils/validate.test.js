const expect = require("expect");

const { isRealString } = require("./validate");

describe("validate.js", () => {
  describe("isRealString", () => {
    it("should validate a valid string", () => {
      expect(isRealString("Jon")).toBe(true); // valid string
      expect(isRealString(" Jon ")).toBe(true); // valud string with leading and training spaces
      expect(isRealString("Jon Snow")).toBe(true); // valud string with spaces
    });

    it("should reject an empty string", () => {
      expect(isRealString("")).toBe(false); // emputy string
      expect(isRealString(" ")).toBe(false); // only spaces
    });

    it("should reject numbers, objects, and arrays", () => {
      expect(isRealString(123)).toBe(false);
      expect(isRealString({name:"Jon"})).toBe(false);
      expect(isRealString(["Jon"])).toBe(false);
    });
  });
});
