const { google } = require("googleapis");
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
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
        if (!folderId) {
            throw new Error("GOOGLE_DRIVE_FOLDER_ID no está definido en el .env");
        }

        const fileMetadata = {
            name: fileName,
            parents: [folderId], // Sube el archivo a la carpeta específica
        };

        const media = {
            mimeType,
            body: require("fs").createReadStream(filePath),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media,
            fields: "id",
        });

        console.log(`Archivo subido con éxito, ID: ${response.data.id}`);
        return response.data.id;
    } catch (error) {
        console.error("Error subiendo archivo a Google Drive:", error.message);
    }
};

module.exports = { drive, uploadFile };
