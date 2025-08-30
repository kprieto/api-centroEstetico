const express = require("express");

const Cita = require("../models/citas");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const cita = new Cita(req.body);
        await cita.save();
        res.status(201).json(cita);

    } catch (error){
        res.status(400).json({mensaje: "Error al crear cita.", error});
    }
});

router.get("/", async (req, res) =>{
    const citas = await Cita.find();
    res.json(citas);
});

router.put('/:cliente', async (req, res) => {
    try {
        const citaActualizada = await Cita.findOneAndUpdate(
            { cliente: req.params.cliente },
            req.body,
            { new: true }
        );
        if (!citaActualizada) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }
        res.json({
            mensaje: 'Cita actualizada correctamente.',
            cliente: citaActualizada
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la cita.', error });
    }
});

router.delete('/:idCliente', async (req, res) => {
    try {
        const resultado = await Cita.deleteMany({ cliente: req.params.idCliente });
        res.json({
        mensaje: 'Citas eliminadas correctamente',
        eliminadas: resultado.deletedCount
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar las citas', error });
    }
});

module.exports = router;