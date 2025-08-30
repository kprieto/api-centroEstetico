const express = require("express");
const cors = require('cors');

const connectDB = require("./database");

require("dotenv").config();

const clienteRoutes = require("./routes/clienteRoutes");
const citaRoutes = require("./routes/citaRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("Bienvenidos al Centro Estetico.");
})

app.use("/api/clientes", clienteRoutes);

app.use("/api/citas", citaRoutes);

const opcionesCors = {
    origin: ['https://centroEstetico.com', 'http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(opcionesCors));

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}}`);
    
});