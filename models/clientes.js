const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    telefono: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Cliente", clientSchema);

