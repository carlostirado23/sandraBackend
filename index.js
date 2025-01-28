const express = require("express");
const { db } = require("./config/firebase"); // Importa la instancia inicializada
const clienteRoutes = require("./src/routers/clienteRoutes");
const app = express();
const port = 4000;

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de clientes
app.use("/api/clientes", clienteRoutes);

// Iniciar el servidor
// app.listen(port, () => {
//     console.log(`Servidor corriendo en http://localhost:${port}`);
// });

// Exporta la app para que Vercel la utilice
module.exports = app;
