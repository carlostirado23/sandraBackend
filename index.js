const express = require("express");
const clienteRoutes = require("./src/routers/clienteRoutes");
const app = express();
const cors = require('cors');

require("dotenv").config();

app.use(cors());

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
