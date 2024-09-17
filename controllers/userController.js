// const db = require('../db');// Importa la conexión a la base de datos

// const getUserById = (req, res) => {
//   const userId = req.params.id;

//   db.query('SELECT id FROM users WHERE id = ?', [userId], (err, results) => {
//     if (err) {

//       return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Usuario no encontrado' });
//     }

//     res.status(200).json(results[0]);
//   });
// };

// module.exports = { getUserById };

const db = require('../db'); // Importa la conexión a la base de datos
const User = require('../models/User');

const userController = {

    getUserById: (req, res) => {
    const userId = req.params.id;
    User.findUserById(userId, (err, users) => {
        console.log(users);
      if (err) return res.status(500).send('Error al obtener las tareas');
      res.status(200).send(users);
    });
  },

  updateUser: (req, res) => {
    const { id } = req.params;
    const { name, last_name, email, phone, address } = req.body;

    const updatedUser = { name, last_name, email, phone, address};

    User.updateUser(id, updatedUser, (err, user) => {
      if (err) {
        if (err.message === 'Usuario no encontraro') {
          return res.status(404).send('Usuario no encontraro');
        }
        return res.status(500).send('Error al actualizar los datos del usuario.');
      }
      res.status(200).json(user);
    });
  },
  

  // updateUser: (id, user, callback) => {
  //   db.query(
  //     'UPDATE users SET name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
  //     [user.name, user.last_name, user.email, user.phone, user.address, id],
  //     (err, res) => {
  //       if (err) return callback(err);
  //       if (res.affectedRows === 0) return callback(new Error('Usuario no encontrado'));
  //       callback(null, { id, ...user });
  //     }
  //   );
  // },

  
}

module.exports = userController;

