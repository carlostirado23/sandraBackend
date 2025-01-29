// clienteRoutes.js
const express = require("express");
const router = express.Router();
const { getClientes } = require("../controllers/clienteController"); // Asegúrate de que la ruta sea correcta

// Definir la ruta GET y pasar la función del controlador
router.get("/", getClientes);

module.exports = router;
