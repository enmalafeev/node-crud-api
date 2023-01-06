import { findUsers, findUserById, addUser } from '../models/usersModel.js';

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
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!regexExp.test(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'userId is invalid' }));
    }
    if (!user) {
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
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);

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
    });
  } catch (err) {
    console.error(err);
  }
};
