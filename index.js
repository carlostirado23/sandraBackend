const express = require("express");
const clienteRoutes = require("./src/routers/clienteRoutes"); // Asegúrate de que la ruta sea correcta
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());

// Usar las rutas de clientes
app.use("/api/clientes", clienteRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

// Exporta la app para que Vercel la utilice
module.exports = app;
