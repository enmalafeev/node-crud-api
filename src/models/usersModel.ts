import { DataBase } from '../db.js';
import { v4 as uuidv4 } from 'uuid';

const db = new DataBase();
export const users = db.getUsers;

export const findUsers = () => new Promise((resolve) => resolve(users));

export const findUserById = (id) =>
  new Promise((resolve) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });

export const addUser = (user) =>
  new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });
