const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");
// Crea una nueva tarea
exports.crearTarea = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);

  // en caso de haber errores
  if (!errores.isEmpty()) {
    res.status(400).json({ errores: errores.array() });
  }

  // Extraer el proyecto
  const { proyecto } = req.body;

  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Obtiene las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
  // Extraer el proyecto
  const { proyecto } = req.query;

  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  try {
    // Extraer el proyecto
    const { proyecto, nombre, estado } = req.body;

    // Si la tarea existe o no
    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    // extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Crear un objeto con la nueva tarea
    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    // Guardar Tarea
    const tarea = await Tarea.findOneAndUpdate(
      { _id: req.params.id },
      nuevaTarea,
      {
        new: true,
      }
    );

    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    // Extraer el proyecto
    const { proyecto } = req.query;

    // Si la tarea existe o no
    const tareaExiste = await Tarea.findById(req.params.id);

    if (!tareaExiste) {
      return res.status(404).json({ msg: "No existe esa tarea" });
    }

    // extraer proyecto
    const existeProyecto = await Proyecto.findById(proyecto);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No Autorizado" });
    }

    // Eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
