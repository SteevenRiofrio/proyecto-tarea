const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// GET /tareas - Listar todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /tareas/:id - Obtener una tarea
router.get('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /tareas - Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    const { descripcion, fechaEntrega, estado } = req.body;
    const nuevaTarea = await Tarea.create({
      descripcion,
      fechaEntrega,
      estado
    });
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /tareas/:id - Actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    const { descripcion, fechaEntrega, estado } = req.body;
    const tarea = await Tarea.findByPk(req.params.id);
    
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.update({
      descripcion,
      fechaEntrega,
      estado
    });
    
    res.json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /tareas/:id - Eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.destroy();
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /tareas/pendientes - Endpoint extra: Listar tareas pendientes
router.get('/estado/pendientes', async (req, res) => {
  try {
    const tareasPendientes = await Tarea.findAll({
      where: {
        estado: 'Pendiente'
      }
    });
    res.json(tareasPendientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;