const { Router } = require('express');
const Media = require('../models/media');
const router = Router();

// GET: Consultar todas las películas y series
router.get('/', async (req, res) => {
    try {
        const medias = await Media.find()
            .populate('generoPrincipal')
            .populate('directorPrincipal')
            .populate('productora')
            .populate('tipo');
        res.json(medias);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar las peliculas/series' });
    }
});

// POST: Crear película o serie
router.post('/', async (req, res) => {
    try {
        const nuevaMedia = new Media(req.body);
        await nuevaMedia.save();
        res.status(201).json(nuevaMedia);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la película/serie', detalle: error.message });
    }
});

// PUT: Actualizar película o serie
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const datos = { ...req.body, fechaActualizacion: Date.now() };
        const mediaActualizada = await Media.findByIdAndUpdate(id, datos, { new: true });
        res.json(mediaActualizada);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la película/serie', detalle: error.message });
    }
});

// DELETE: Eliminar película o serie por su ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const mediaEliminada = await Media.findByIdAndDelete(id);

        if (!mediaEliminada) {
            return res.status(404).json({ error: 'La producción no fue encontrada', detalle: error.message });
        }

        res.json({ mensaje: 'Producción eliminada exitosamente', mediaEliminada });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar la película/serie', detalle: error.message });
    }
});

module.exports = router;