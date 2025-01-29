// firebase.js
require("dotenv").config(); // Carga las variables de entorno desde el archivo .env
const admin = require("firebase-admin"); // Importa el SDK de Firebase Admin

// Crea el objeto de servicio utilizando las variables de entorno
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Asegura que los saltos de línea estén correctos
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe: process.env.FIREBASE_UNIVERSE,
};

// Inicializa Firebase Admin con las credenciales del archivo .env
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Exporta la instancia de admin para usarla en otros archivos si es necesario
module.exports = admin;
