import { runQuery } from "../dals/dal.js";
import UserModel from "../models/user.model.js";

export async function getAllUsers() {
  const query = "SELECT * FROM users";
  try {
    const users = await runQuery(query);
    return users[0].map((u) => new UserModel(u));
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addUser(newUser) {
  const query =
    "INSERT INTO `users`(`user_id`,`username`,`password`,`email`)VALUES(uuid(), ?, ?, ?);";
  try {
    const added = await runQuery(query, Object.values(newUser));
    return new UserModel(newUser);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserById(userId) {
  const query = "SELECT * FROM users WHERE user_id = ?";

  try {
    const user = await runQuery(query, userId);
    return new UserModel(user[0]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?";

  try {
    const user = await runQuery(query, username);
    console.log(user);
    return !!user.length ? new UserModel(user[0]) : !!user.length;
  } catch (error) {
    throw new Error(error.message);
  }
}
