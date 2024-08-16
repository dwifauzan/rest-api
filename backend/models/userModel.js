const db = require('../config/campus');

const getUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], callback);
};

const createUser = (username, password, role, callback) => {
    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, password, role], callback);
};

const getDataUser = (callback) => {
    const query = 'SELECT * FROM users'
    db.query(query, callback)
}

module.exports = { getUserByUsername, createUser, getDataUser };
