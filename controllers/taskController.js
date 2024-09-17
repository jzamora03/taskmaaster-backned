// controllers/taskController.js
const Task = require('../models/Task');

const taskController = {
  createTask: (req, res) => {
    const newTask = {
      user_id: req.userId,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };
    Task.create(newTask, (err, task) => {
      if (err) return res.status(500).send('Error al crear la tarea');
      res.status(201).send(task);
    });
  },
  getTasks: (req, res) => {
    Task.findByUserId(req.userId, (err, tasks) => {
      if (err) return res.status(500).send('Error al obtener las tareas');
      res.status(200).send(tasks);
    });
  },

  updateTask: (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = { title, description, status };

    Task.update(id, updatedTask, (err, task) => {
      if (err) {
        if (err.message === 'Tarea no encontrada') {
          return res.status(404).send('Tarea no encontrada');
        }
        return res.status(500).send('Error al actualizar la tarea');
      }
      res.status(200).json(task);
    });
  },

  deleteTask: (req, res) => {
    const { id } = req.params;

    Task.delete(id, (err) => {
      if (err) {
        if (err.message === 'Tarea no encontrada') {
          return res.status(404).send('Tarea no encontrada');
        }
        return res.status(500).send('Error al eliminar la tarea');
      }
      res.status(204).send(); // No content
    });
  },

};

module.exports = taskController;

