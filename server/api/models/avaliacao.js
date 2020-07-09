var mongoose = require("mongoose");

var avaliacaoSchema = new mongoose.Schema({
    descricao: String,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    anuncio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    }
});

const Avaliacao = mongoose.model('Avaliacao', avaliacaoSchema);

module.exports = Avaliacao;