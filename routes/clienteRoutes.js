const express = require("express");

const Cliente = require("../models/clientes");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);

    } catch (error){
        res.status(400).json({mensaje: "Error al registrar el cliente.", error});
    }
});

router.get("/", async (req, res) =>{
    const clientes = await Cliente.find();
    res.json(clientes);
});

router.put('/:correo', async (req, res) => {
    try {
        const clienteActualizado = await Cliente.findOneAndUpdate(
            { email: req.params.correo },
            req.body,
            { new: true }
        );
        if (!clienteActualizado) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({
            mensaje: 'Cliente actualizado correctamente',
            cliente: clienteActualizado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar el cliente', error });
    }
});

router.delete('/:correo', async (req, res) => {
    try {
        const clienteEliminado = await Cliente.findOneAndDelete({ email: req.params.correo });
        if (!clienteEliminado) {
        return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({
        mensaje: 'Cliente eliminado correctamente',
        cliente: clienteEliminado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar el cliente', error });
    }
});

module.exports = router;