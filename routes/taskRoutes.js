
// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, taskController.createTask); //Crea tareas
router.get('/', verifyToken, taskController.getTasks); //Muestra todas las tareas
router.put('/:id', verifyToken, taskController.updateTask); // Actualiza la tarea
router.delete('/:id', verifyToken, taskController.deleteTask); // Elimina la tarea

module.exports = router;
