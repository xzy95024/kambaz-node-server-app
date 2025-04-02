import { users } from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
let localUsers = users;

export const findAllUsers = () => localUsers;

export const findUserById = (userId) =>
    localUsers.find((user) => user._id === userId);

export const createUser = (user) =>
    (localUsers = [...localUsers, { ...user, _id: uuidv4() }]);

export const findUserByUsername = (username) =>
    localUsers.find((user) => user.username === username);

export const findUserByCredentials = (username, password) =>
    localUsers.find((user) => user.username === username && user.password === password);

export const updateUser = (userId, user) =>
    (localUsers = localUsers.map((u) => (u._id === userId ? user : u)));

export const deleteUser = (userId) =>
    (localUsers = localUsers.filter((u) => u._id !== userId));
