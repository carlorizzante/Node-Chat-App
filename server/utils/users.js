class Users {

  // Initializes the internal users list (empty array)
  constructor () {
    this.users = [];
  }

  // Adds an user to the users list
  addUser (id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  // Returns an user by id
  getUser (id) {
    return this.users.filter(user => user.id === id)[0];
  }

  // Removes and return an user by id
  removeUser (id) {
    const user = this.getUser(id);
    if (user) this.users = this.users.filter(user => user.id !== id);
    return user;
  }

  // Returns an array of names in a room
  getUsersList (room) {
    return this.users.filter(user => user.room === room).map(user => user.name);
  }
}

module.exports = Users;
