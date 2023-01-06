import { DataBase } from '../db.js';

const db = new DataBase();
export const users = db.getUsers;

export const findUsers = () => new Promise((resolve) => resolve(users));

export const findUserById = (id) =>
  new Promise((resolve) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
