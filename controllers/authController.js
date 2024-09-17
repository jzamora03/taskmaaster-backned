// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authController = {
  register: (req, res) => {
    const { name, last_name, email, password, phone, address } = req.body;
    User.create({ name, last_name, email, password, phone, address }, (err, user) => {
      if (err) return res.status(500).send('Error en el servidor');
      res.status(201).send('Usuario registrado');
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, user) => {
      if (err) return res.status(500).send('Error en el servidor');
      if (!user) return res.status(404).send('Usuario no encontrado');
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return res.status(401).send('Contraseña incorrecta');
      const token = jwt.sign({ id: user.id }, 'clave_secreta', { expiresIn: 86400 });
      res.status(200).send({ auth: true, token });
    });
  },
};

module.exports = authController;
