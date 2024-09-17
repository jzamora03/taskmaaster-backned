// models/Task.js
const db = require('../db');

const Task = {

  create: (task, callback) => {
    db.query(
      'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
      [task.user_id, task.title, task.description, task.status],
      (err, res) => {
        if (err) return callback(err);
        callback(null, { id: res.insertId, ...task });
      }
    );
  },

  update: (id, task, callback) => {
    db.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [task.title, task.description, task.status, id],
      (err, res) => {
        if (err) return callback(err);
        if (res.affectedRows === 0) return callback(new Error('Tarea no encontrada'));
        callback(null, { id, ...task });
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, res) => {
      if (err) return callback(err);
      if (res.affectedRows === 0) return callback(new Error('Tarea no encontrada'));
      callback(null);
    });
  },

  findByUserId: (user_id, callback) => {
    db.query('SELECT * FROM tasks WHERE user_id = ?', [user_id], (err, res) => {
      if (err) return callback(err);
      callback(null, res);
    });
  },

  findUserById: (user_id, callback) => {
    db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, res) => {
      if (err) return callback(err);
      callback(null, res);
    });
  },
  // Otros métodos como update, delete, etc.
};

module.exports = Task;
