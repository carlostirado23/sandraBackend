const db = require("../../index").db;

// Obtener todos los clientes
exports.getAllClientes = async () => {
    const snapshot = await db.collection("cliente").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Crear un nuevo cliente
exports.addCliente = async (data) => {
    const clienteRef = await db.collection("cliente").add(data);
    return { id: clienteRef.id, ...data };
};
