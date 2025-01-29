// src/config/firebase.js
const admin = require("firebase-admin");

// Inicializa Firebase con el archivo JSON de credenciales
const path = require("path");
const serviceAccount = require(path.resolve(__dirname, "../sandra-77bcf-firebase-adminsdk-fbsvc-9f17f74b6a.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };
