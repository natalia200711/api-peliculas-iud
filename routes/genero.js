const { Router } = require('express');
const Genero = require('../models/genero');
const router = Router();

// GET: Consultar todos los géneros
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los géneros', detalle: error.message });
    }
});

// POST: Crear un nuevo género
router.post('/', async (req, res) => {
    try {
        const nuevoGenero = new Genero(req.body);
        await nuevoGenero.save();
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el género', detalle: error.message });
    }
});

// PUT: Actualizar un género por su ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datos = { ...req.body, fechaActualizacion: Date.now() };
        const generoActualizado = await Genero.findByIdAndUpdate(id, datos, { new: true });
        
        if (!generoActualizado) {
            return res.status(404).json({ error: 'El género no fue encontrado' });
        }

        res.json(generoActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el género', detalle: error.message });
    }
});

// DELETE: Eliminar un género por su ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const generoEliminado = await Genero.findByIdAndDelete(id);

        if (!generoEliminado) {
            return res.status(404).json({ error: 'El género no fue encontrado' });
        }

        res.json({ mensaje: 'Género eliminado exitosamente', generoEliminado });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el género', detalle: error.message });
    }
});

module.exports = router;