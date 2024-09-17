const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

// Obtener datos del usuario por ID
router.get('/:id', verifyToken, userController.getUserById);

// Editar datos del usuario
router.put('/:id', verifyToken, userController.updateUser);


module.exports = router;
