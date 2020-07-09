const Usuario = require('../models/usuario');
const jwt = require("jsonwebtoken");
const SECRET = "XXkOCvvX8DcM8eg6EMDdtLzgyakg7r95D9cDmjDqTCGwWyX5PA";

function logar(email, senha, callback){
    if(!email || email.trim().length < 1){
        callback({mensagem: "Email não informado."}, null);
    }else if(!senha || senha.trim().length < 1){
        callback({mensagem: "Senha não informada."}, null);
    }else{
        Usuario.findOne({email, senha}, (err, doc) => {

            if(err){
                callback({mensagem: "Não foi possível realizar o login."}, null);
            }else{
                if(doc == null){
                    callback({mensagem: "Usuário ou senha inválidos."}, null);
                }else{
                    callback(null, jwt.sign({ usuarioId: doc._id}, SECRET, { expiresIn: '1d' }));
                }
            }
        });
    }
}

function checkAutenticacao(req, res, next){
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({error: "Você não tem permissão para acessar esse recurso!"});
    }

    jwt.verify(token, SECRET, function(err, decoded) {
        if(err){
            return res.status(403).json({error: "Você não tem permissão para acessar esse recurso!"});
        }
        req.usuarioId = decoded.usuarioId;

        next();
  });
}

module.exports = {logar, checkAutenticacao};