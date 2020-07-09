const mongoose = require("mongoose");

mongoose.connect("mongodb://marcelo-rezin:vDviRN83@marcelorezin.com.br:23151/marketplace", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

mongoose.connection.on("connected", () =>{
    console.log("Conexão com o banco inciada.");
});

module.exports = mongoose;