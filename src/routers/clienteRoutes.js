const express = require("express");
const { getClientes, createCliente, updateCliente, deleteCliente } = require("../controllers/clienteController");

const router = express.Router();

router.get("/", getClientes); // Ruta para obtener todos los clientes
router.post("/", createCliente); // Ruta para crear un cliente
router.put("/:id", updateCliente); // Ruta para actualizar un cliente
router.delete("/:id", deleteCliente); // Ruta para eliminar un cliente

module.exports = router;
