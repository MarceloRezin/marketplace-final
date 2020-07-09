var mongoose = require("mongoose");

var compraSchema = new mongoose.Schema({
    quantidade: Number,
    valorUnitario: {type: 'Decimal128'},
    valorFinal: {type: 'Decimal128'},
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    anuncio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anuncio'
    }
});

const Compra = mongoose.model('Compra', compraSchema);

module.exports = Compra;