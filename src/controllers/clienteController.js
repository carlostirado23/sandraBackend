const { admin } = require("../../config/firebase"); 

const getClientes = async (req, res) => {
    try {
        const clientesCollection = admin.firestore().collection("clientes");
        const snapshot = await clientesCollection.get();
        const clientes = snapshot.docs.map((doc) => doc.data());
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({ error: "Error al obtener clientes" });
    }
};

module.exports = { getClientes };