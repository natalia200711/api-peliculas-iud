const { Router } = require('express');
const Director = require('../models/director');
const router = Router();

// GET: Consultar directores
router.get('/', async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar los directores', detalle: error.message });
    }
});

// POST: Crear director
router.post('/', async (req, res) => {
    try {
        const nuevoDirector = new Director(req.body);
        await nuevoDirector.save();
        res.status(201).json(nuevoDirector);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el director', detalle: error.message });
    }
});

// PUT: Actualizar director
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datos = { ...req.body, fechaActualizacion: Date.now() };
        const directorActualizado = await Director.findByIdAndUpdate(id, datos, { new: true });
        
        if (!directorActualizado) {
            return res.status(404).json({ error: 'El director no fue encontrado' });
        }

        res.json(directorActualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el director', detalle: error.message });
    }
});

// DELETE: Eliminar director por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const directorEliminado = await Director.findByIdAndDelete(id);

        if (!directorEliminado) {
            return res.status(404).json({ error: 'El director no fue encontrado' });
        }

        res.json({ mensaje: 'Director eliminado exitosamente', directorEliminado });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el director', detalle: error.message });
    }
});

module.exports = router;