// src/config/firebase.js
require("dotenv").config();
const admin = require("firebase-admin");

// Función para procesar la clave privada
const processPrivateKey = (key) => {
    // Asegurarse de que la clave privada esté en el formato correcto
    if (typeof key === "string") {
        return key.replace(/\\n/g, "\n");
    }
    return key;
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

try {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("Firebase inicializado correctamente");
    }
} catch (error) {
    console.error("Error al inicializar Firebase:", error);
    throw error;
}

const db = admin.firestore();

module.exports = { db, admin };
