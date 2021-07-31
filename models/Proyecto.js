const mongoose = require("mongoose");

const ProyectoSchema = mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  creador: {
    // referencia de otro objeto
    type: mongoose.Schema.Types.ObjectId,
    // referenciar a la tabla que hace llamado
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
