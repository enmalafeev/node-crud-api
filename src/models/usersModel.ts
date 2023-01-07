import { DataBase } from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../types/userTypes.js';

const db = new DataBase();
export const users = db.getUsers;

export const findUsers = (): Promise<IUser[]> => new Promise((resolve) => resolve(users));

export const findUserById = (id: string): Promise<IUser | undefined> =>
  new Promise((resolve) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });

export const addUser = (user: IUser): Promise<IUser | undefined> =>
  new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    resolve(newUser);
  });

export const patchUser = (id: string, updatedUserData: IUser): Promise<IUser | undefined> =>
  new Promise((resolve) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { id, ...updatedUserData };
    resolve(users[index]);
  });
