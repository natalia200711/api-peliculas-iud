const { Router } = require('express');
const Tipo = require('../models/tipo');
const router = Router();

// GET: Consultar tipos (Película o Serie)
router.get('/', async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los tipos', detalle: error.message });
    }
});

// POST: Crear tipo
router.post('/', async (req, res) => {
    try {
        const nuevoTipo = new Tipo(req.body);
        await nuevoTipo.save();
        res.status(201).json(nuevoTipo);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el tipo', detalle: error.message });
    }
});

// PUT: Actualizar tipo
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datos = { ...req.body, fechaActualizacion: Date.now() };
        const tipoActualizado = await Tipo.findByIdAndUpdate(id, datos, { new: true });
        
        if (!tipoActualizado) {
            return res.status(404).json({ error: 'El tipo no fue encontrado' });
        }

        res.json(tipoActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el tipo', detalle: error.message });
    }
});

// DELETE: Eliminar tipo por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tipoEliminado = await Tipo.findByIdAndDelete(id);

        if (!tipoEliminado) {
            return res.status(404).json({ error: 'El tipo no fue encontrado' });
        }

        res.json({ mensaje: 'Tipo eliminado exitosamente', tipoEliminado });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el tipo', detalle: error.message });
    }
});

module.exports = router;