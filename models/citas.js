const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citaSchema = new mongoose.Schema({
    cliente: {
        type:Schema.Types.ObjectId,
        ref: "Clientes",
        required: true
    },
    fecha: {
        type:Date,
        required: true
    },
    servicio: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Cita", citaSchema);

