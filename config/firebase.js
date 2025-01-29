// src/config/firebase.js
require("dotenv").config();
const admin = require("firebase-admin");

// Función para procesar la clave privada
const processPrivateKey = (key) => {
    // Verifica si la clave viene con comillas y las remueve si es necesario
    const cleanKey = key?.replace(/"/g, "") || "";
    // Reemplaza los \n escapados por saltos de línea reales
    return cleanKey.replace(/\\n/g, "\n");
};

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: processPrivateKey(process.env.FIREBASE_PRIVATE_KEY),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

let db;

try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("Firebase inicializado correctamente");
        db = admin.firestore();
    } else {
        db = admin.firestore();
    }
} catch (error) {
    console.error("Error al inicializar Firebase:", error);
    console.error("Service Account:", JSON.stringify(serviceAccount, null, 2));
    throw error;
}

module.exports = { db, admin };
