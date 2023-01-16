import { IUser } from './types/userTypes.js';

export class DataBase {
  users: IUser[];

  constructor() {
    this.users = [];
  }

  get getUsers() {
    return this.users;
  }

  set setUsers(user: IUser) {
    this.users.push(user);
  }
}
