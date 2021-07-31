// Rutas para crear usuarios
const express = require("express");

const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");
// Crear un usuario
// api/usuarios
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check(
      "password",
      "El password debe ser mínimo de 6 a 15 caracteres"
    ).isLength({ min: 6, max: 15 }),
  ],
  usuarioController.crearUsuario
);

module.exports = router;
