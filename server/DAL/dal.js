const UserModel = require("../models/user-model");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "whats_up",
  debug: false,
});

const fs = require("fs").promises;

const getAllUsersAsync = () => {
  /*pool.query("SELECT * FROM users", function (error, results, fields) {
    if (error) throw error;
    console.log(results.map(r=>({...r})));
  });*/
  return fs
    .readFile(__dirname + "/../" + "database" + "/users.json")
    .then((res) => JSON.parse(res));
};

const saveAllUsersAsync = (users) =>
  fs.writeFile(
    __dirname + "/../" + "database" + "/users.json",
    JSON.stringify(users, null, 4)
  );

const getUserById = async (userId) => {
  const user = await getAllUsersAsync().then((res) =>
    res.find((u) => u.id === userId)
  );
  return user;
};
const getUsersMessages = (userId) => {};

const getUserByUsernameAsync = async (username) => {
 /* return new Promise((res, rej) => {
    pool.query(
      "SELECT username,password,user_id as id FROM users WHERE username = ?",
      username,
      function (error, results, fields) {
        if (error) rej(error);
        if (results[0]) {
          res({ ...results[0] });
        } else res(null);
      }
    );
  });*/
  const user = await getAllUsersAsync().then((res) =>
    res.find((u) => u.username === username)
  );
  if (!user) return null;
  return user;
};

const getContacts = (username) => {
  
}

const updateUserAsync = async (userId, changedParams) => {
  const users = await getAllUsersAsync();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...changedParams };
  dal.saveAllUsersAsync(users);
  return users[idx];
};

const deleteUserAsync = (id) =>
  getAllUsersAsync()
    .then((users) => users.filter((u) => u.id !== id))
    .then((res) => dal.saveAllUsersAsync(res));

module.exports = {
  getUserByUsernameAsync,
  getAllUsersAsync,
  saveAllUsersAsync,
  updateUserAsync,
  deleteUserAsync,
  getUserById,
};
