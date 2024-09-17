// models/User.js
const db = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  create: (user, callback) => {
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    db.query(
      'INSERT INTO users (email, password, name, last_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
      [user.email, hashedPassword, user.name, user.last_name, user.phone, user.address],
      (err, res) => {
        if (err) return callback(err);
        callback(null, { id: res.insertId, ...user });
      }
    );
  },

  updateUser: (id, user, callback) => {
    db.query(
      'UPDATE users SET name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [user.name, user.last_name, user.email, user.phone, user.address, id],
      (err, res) => {
        if (err) return callback(err);
        if (res.affectedRows === 0) return callback(new Error('Usuario no encontrado'));
        callback(null, { id, ...user });
      }
    );
  },
  
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, res) => {
      if (err) return callback(err);
      callback(null, res[0]);
    });
  },

  findUserById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
      if (err) return callback(err);
      callback(null, res);
    });
  },

};


module.exports = User;
