const firebaseAdmin = require("firebase-admin");

let app;
if (!firebaseAdmin.apps.length) {
    app = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
            require("../../sandra-77bcf-firebase-adminsdk-fbsvc-b0ae33bf48.json")
        ),
    });
} else {
    app = firebaseAdmin.app(); // Usa la app ya inicializada
}

const db = firebaseAdmin.firestore();

module.exports = { firebaseAdmin, db };
