const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
// crear proyecto
// api/proyectos
router.post(
  "/",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.crearProyecto
);

// obtener todos los proyectos del usuario
router.get("/", auth, proyectoController.obtenerProyectos);

// Actualizar proyecto via Id
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

// Eliminar un Proyecto
router.delete(
    "/:id",
    auth,
    proyectoController.eliminarProyecto
  );
module.exports = router;
