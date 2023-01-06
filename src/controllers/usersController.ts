import { findUsers } from '../models/usersModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await findUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.error(err);
  }
};
