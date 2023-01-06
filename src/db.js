export class DataBase {
  constructor() {
    this.users = [];
  }

  get users() {
    return this.users;
  }

  set users(user) {
    this.users.push(user);
  }
}
