const express = require("express");
const { getClientes, getClienteById, createCliente, updateCliente, deleteCliente } = require("../controllers/clienteController");

const router = express.Router();

router.get("/", getClientes);
router.get("/:id", getClienteById);
router.post("/", createCliente); 
router.put("/:id", updateCliente); 
router.delete("/:id", deleteCliente); 

module.exports = router;
