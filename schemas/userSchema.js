const { body } = require("express-validator");

const validateRegister = [
    body("correo").isEmail().withMessage("El correo no es válido"),
    body("contrasena").isLength({ min: 4 }).withMessage("La contraseña debe tener al menos 4 caracteres"),
];

module.exports = { validateRegister };
