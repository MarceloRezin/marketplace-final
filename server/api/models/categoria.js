var mongoose = require("mongoose");

var categoriaSchema = new mongoose.Schema({
    nome:  String,
    descricao: String
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;