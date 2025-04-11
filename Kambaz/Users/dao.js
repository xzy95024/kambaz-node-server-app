// import { users } from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4().toString(),  };
    return model.create(newUser);
}


export const findAllUsers = () => model.find();
export const findUsersByRole = (role) => model.find({ role: role });
export const findUserById = (userId) => model.findById(userId);

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
        $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
};

export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });



// let localUsers = users;
// export const findAllUsers = () => localUsers;
//
// export const findUserById = (userId) =>
//     localUsers.find((user) => user._id === userId);
//
// export const createUser = (user) =>
//     (localUsers = [...localUsers, { ...user, _id: uuidv4() }]);
//
// export const findUserByUsername = (username) =>
//     localUsers.find((user) => user.username === username);
//
// export const findUserByCredentials = (username, password) =>
//     localUsers.find((user) => user.username === username && user.password === password);
//
// export const updateUser = (userId, user) =>
//     (localUsers = localUsers.map((u) => (u._id === userId ? user : u)));
//
// export const deleteUser = (userId) =>
//     (localUsers = localUsers.filter((u) => u._id !== userId));
