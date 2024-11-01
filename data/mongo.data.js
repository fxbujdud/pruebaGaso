const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.SECRET_MONGO)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB", error));
