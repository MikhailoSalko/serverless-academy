import fs from "fs/promises";
import path from "path";

const usersPath = path.resolve("db", "users.txt");

const listOfUsers = async () => {
  const buffer = await fs.readFile(usersPath);
  const users = buffer.toString();
  return JSON.parse(users);
};

const addUser = async (msg) => {
  const newUser = { id: Math.floor(Math.random() * 100000).toString(), ...msg };
  const users = ([] = await listOfUsers(usersPath));
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  const updatedUsers = await listOfUsers(usersPath);
  return updatedUsers;
};

const getUserByName = async (name) => {
  const users = await listOfUsers();
  const normalizedSearchName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const foundUser = users.find((user) => user.name === normalizedSearchName);
  return foundUser || null;
};

export default { listOfUsers, addUser, getUserByName };
