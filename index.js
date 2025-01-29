const express = require("express");
const clienteRoutes = require("./src/routers/clienteRoutes"); // Asegúrate de que la ruta sea correcta
const app = express();
const port = 4000;

app.use(express.json());

// Usar las rutas de clientes
app.use("/api/clientes", clienteRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Exporta la app para que Vercel la utilice
// module.exports = app;
