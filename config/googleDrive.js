const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();

// Función para procesar la clave privada
const processPrivateKey = (key) => {
    if (!key) {
        console.error("Error: GOOGLE_PRIVATE_KEY no está definida en el .env");
        process.exit(1);
    }
    return key.replace(/\\n/g, "\n");
};

// Verificar que las variables de entorno esenciales estén definidas
if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error("Error: Faltan variables de entorno necesarias para la autenticación.");
    process.exit(1);
}

// Configuración de autenticación
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: processPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

// Función para subir un archivo a Google Drive
const uploadFile = async (filePath, fileName, mimeType) => {
    try {
        const fileMetadata = {
            name: fileName,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // El ID de la carpeta donde se subirán los archivos
        };

        const media = {
            mimeType: mimeType,
            body: fs.createReadStream(filePath),
        };

        const file = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: "id",
        });

        console.log("Archivo subido con ID:", file.data.id);
        return file.data.id;
    } catch (error) {
        console.error("Error al subir archivo:", error.message);
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
        throw error;
    }
};

module.exports = { drive, uploadFile };
