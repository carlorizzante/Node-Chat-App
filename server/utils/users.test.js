const expect = require("expect");

const Users = require("./users");

describe("user.js", () => {

  let users;

  beforeEach(() => {
    users = new Users;
    users.users = [{
      id: 1,
      name: "Jon",
      room: "The Wall"
    }, {
      id: 2,
      name: "Barbi",
      room: "The Wall"
    }, {
      id: 3,
      name: "Victoria",
      room: "The Green Tower"
    }];
  });

  describe("addUser", () => {
    it("should add and return a new user", () => {
      const users_length = users.users.length; // 3
      const user = {
        id: 4,
        name: "Drake",
        room: "The Wall"
      }
      const new_user = users.addUser(user.id, user.name, user.room);
      expect(new_user).toEqual(user);
      expect(users.users[users_length]).toEqual(user);
      expect(users.users.length).toBe(users_length + 1);
    });
  });

  describe("getUser", () => {
    it("should return an user by id", () => {
      const users_length = users.users.length;
      const user = users.getUser(users_length); // get the last user
      expect(user).toEqual(users.users[users_length - 1]);
      expect(users.users.length).toBe(users_length); // users length should not change
    });

    it("should not return an user if invalid id", () => {
      const users_length = users.users.length;
      const user = users.getUser(users_length + 1); // invalid id
      expect(user).toBe(undefined);
      expect(user).toNotExist();
      expect(users.users.length).toBe(users_length); // users length should not change
    });
  });

  describe("removeUser", () => {
    it("should return an user by id and remove it from the list", () => {
      const users_length = users.users.length;
      const removed_user = users.users[0]; // first user in the list
      const user = users.removeUser(removed_user.id); // remove user
      expect(user).toEqual(removed_user); // returns last user
      expect(users.users.length).toBe(users_length - 1); // user length decreases by 1
      expect(users.users).toNotInclude(users[users_length - 1]); // last user no longer in the list
    });

    it("should not remove an user if invalid id", () => {
      const users_length = users.users.length;
      const user = users.getUser(users_length + 1); // invalid id
      expect(user).toBe(undefined);
      expect(user).toNotExist();
      expect(users.users.length).toBe(users_length); // users length should not change
    });
  });

  describe("getUsersList", () => {
    it("should return a list of users by room", () => {
      const users_length = users.users.length;
      const users_list = users.getUsersList("The Wall");
      expect(users_list.length).toBe(2); // two users in the room "The Wall"
      expect(users_list).toEqual(["Jon", "Barbi"]);
      expect(users.users.length).toBe(users_length); // list length should not change
    });

    it("should return an empty list if no valid room", () => {
      const users_length = users.users.length;
      const users_list = users.getUsersList("ABC"); // invalid room
      expect(users_list.length).toBe(0);
      expect(users_list).toEqual([]);
      expect(users.users.length).toBe(users_length); // list length should not change
    });
  });
});
