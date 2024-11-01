const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  paterno: String,
  materno: String,
  roll: Number,
  password: String,
  username: String,
  email: String
});

module.exports = mongoose.model('usuarios', usuarioSchema);