export class DataBase {
  constructor() {
    this._users = [];
  }

  get users() {
    return this._users;
  }

  set users(user) {
    this._users.push(user);
  }
}
