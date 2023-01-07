import { findUsers, findUserById, addUser, patchUser, removeUser } from '../models/usersModel.js';
import { getPostData, isUuid } from '../utils.js';

export const getUsers = async (req, res) => {
  try {
    const users = await findUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (req, res, id) => {
  try {
    const user = await findUserById(id);
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'userId is invalid' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body as string);

    const user = {
      username,
      age,
      hobbies
    };

    if (!username || !age || !hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'body does not contains required fields' }));
    } else {
      const newUser = await addUser(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateUser = async (req, res, id) => {
  try {
    const user = await findUserById(id);

    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'userId is invalid' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user not found' }));
    } else {
      const body = await getPostData(req);
      const { username, age, hobbies } = JSON.parse(body as string);

      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies
      };
      const updatedUser = await patchUser(id, userData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (req, res, id) => {
  try {
    const user = await findUserById(id);
    if (!isUuid(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'userId is invalid' }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user not found' }));
    } else {
      await removeUser(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
    }
  } catch (err) {
    console.error(err);
  }
};
