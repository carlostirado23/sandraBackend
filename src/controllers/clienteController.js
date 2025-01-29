const db = require("../../config/firebase").db;
const clienteModel = require("../models/clienteModel"); 

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const snapshot = await db.collection("cliente").get();
        const clientes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).send("Error al obtener clientes");
    }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection("cliente").doc(id).get();

        if (!doc.exists) {
            return res.status(404).send("Cliente no encontrado");
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Error al obtener cliente:", error);
        res.status(500).send("Error al obtener cliente");
    }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    try {
        const nuevoCliente = req.body;
        const clienteRef = await db.collection("cliente").add(nuevoCliente);
        res.status(201).json({ id: clienteRef.id, ...nuevoCliente });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).send("Error al crear cliente");
    }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        await db.collection("cliente").doc(id).update(datosActualizados);
        res.status(200).json({ id, ...datosActualizados });
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).send("Error al actualizar cliente");
    }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection("cliente").doc(id).delete();
        res.status(200).send(`Cliente con ID ${id} eliminado`);
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).send("Error al eliminar cliente");
    }
};
