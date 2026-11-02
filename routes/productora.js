const { Router } = require('express');
const Productora = require('../models/productora');
const router = Router();

// GET: Consultar productoras
router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las productoras', detalle: error.message });
    }
});

// POST: Crear productora
router.post('/', async (req, res) => {
    try {
        const nuevaProductora = new Productora(req.body);
        await nuevaProductora.save();
        res.status(201).json(nuevaProductora);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la productora', detalle: error.message });
    }
});

// PUT: Actualizar productora
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datos = { ...req.body, fechaActualizacion: Date.now() };
        const productoraActualizada = await Productora.findByIdAndUpdate(id, datos, { new: true });
        
        if (!productoraActualizada) {
            return res.status(404).json({ error: 'La productora no fue encontrada' });
        }

        res.json(productoraActualizada);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la productora', detalle: error.message });
    }
});

// DELETE: Eliminar productora por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productoraEliminada = await Productora.findByIdAndDelete(id);

        if (!productoraEliminada) {
            return res.status(404).json({ error: 'La productora no fue encontrada' });
        }

        res.json({ mensaje: 'Productora eliminada exitosamente', productoraEliminada });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar la productora', detalle: error.message });
    }
});

module.exports = router;