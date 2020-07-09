var mongoose = require("mongoose");

var usuarioSchema = new mongoose.Schema({
    nome: String,
    email: {type: String, unique: true},
    senha: String,
    endereco: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;