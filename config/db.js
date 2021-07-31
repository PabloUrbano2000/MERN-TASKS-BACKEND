const mongoose = require("mongoose");

// ESTO ES NECESARIO PARA CONECTARNOS POR PROCESS
require("dotenv").config({ path: "variables.env" });

// todo esto se requiere para conectarse a mongo
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DATABASE CONECTADA!");
  } catch (error) {
    console.log(error);
    process.exit(1); // Detener la app
  }
};

module.exports = conectarDB;
