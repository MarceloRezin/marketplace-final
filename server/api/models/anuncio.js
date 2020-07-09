var mongoose = require("mongoose");

var anuncioSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    valor: {type: 'Decimal128'},
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria'
    }
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;