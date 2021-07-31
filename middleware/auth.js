const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  // Leer el token del header
  const token = req.header("x-auth-token");

  // Revisar si no hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no valido" });
  }

  //validar el token
  try {
    // verificamos
    const cifrado = jwt.verify(token, process.env.SECRETA);

    // a la respuesta le envio el usuario obtenido del cifrado
    req.usuario = cifrado.usuario;

    // pasamos al siguiente middleware
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido" });
  }
};
