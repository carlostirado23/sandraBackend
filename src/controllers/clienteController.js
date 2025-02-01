const db = require("../../config/firebase").db;

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
        const { nombres, apellidos, telefono, fechaEntrega, imagen } = req.body;

        if (!imagen) {
            return res.status(400).json({ error: "El campo imagen es obligatorio" });
        }

        // Verificar si la imagen está en formato Base64
        if (typeof imagen !== "string") {
            return res.status(400).json({ error: "El campo imagen debe ser una cadena en Base64" });
        }

        // Verificar si la imagen excede el límite de tamaño (por ejemplo 1MB)
        const imageSize = Buffer.from(imagen, "base64").length;
        const maxSize = 1048487; // 1MB en bytes

        if (imageSize > maxSize) {
            return res.status(400).json({ error: "La imagen es demasiado grande. Debe ser menor a 1MB." });
        }

        // Crear el nuevo cliente
        const nuevoCliente = { nombres, apellidos, telefono, fechaEntrega, imagen };
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
        const { nombres, apellidos, telefono, fechaEntrega, imagen } = req.body;

        if (imagen && typeof imagen !== "string") {
            return res.status(400).json({ error: "El campo imagen debe ser una cadena en Base64" });
        }

        const clienteRef = db.collection("cliente").doc(id);

        const clienteDoc = await clienteRef.get();
        if (!clienteDoc.exists) {
            return res.status(404).send("Cliente no encontrado");
        }

        // Actualizar los campos del cliente
        const updatedCliente = {
            nombres,
            apellidos,
            telefono,
            fechaEntrega,
            imagen: imagen || clienteDoc.data().imagen, // Si no se pasa imagen, conservar la anterior
        };

        await clienteRef.update(updatedCliente);

        res.status(200).json({ id, ...updatedCliente });
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
