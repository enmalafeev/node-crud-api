import { DataBase } from '../db.js';

const db = new DataBase();
export const users = db.users;

export const findUsers = () => new Promise((resolve) => resolve(users));
