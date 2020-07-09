const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");
const autenticacao = require("../autenticacao/autenticacao");

router.get("/", autenticacao.checkAutenticacao, (req, res) => {   
    const nomeQuery = req.query.nome;
    let query = {};
    if(nomeQuery && nomeQuery.trim().length > 0) {
        query = {nome: new RegExp(nomeQuery, 'i')};
    }

    const limitQuery = req.query.limit;
    let limit = null;
    if(limitQuery && limitQuery.trim().length > 0) {
        limit = parseInt(limitQuery);
    }

    Usuario.find(query).limit(limit).exec((err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível listar os usuários."});
        }else{
            res.status(200).json(doc);
        }
    });
});

router.get("/:id", autenticacao.checkAutenticacao, (req, res) => {
    Usuario.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível buscar o usuário."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Usuário não encontrado."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

router.post("/", (req, res) => {
    
    const body = req.body;

    if(!body.nome || body.nome.trim().length < 1){
        res.status(400).json({error: "O nome do usuário é obrigatório."});
    }else if(!body.email || body.email.trim().length < 1){
        res.status(400).json({error: "O email do usuário é obrigatório."});
    }else if(!body.senha || body.senha.trim().length < 1){
        res.status(400).json({error: "A senha do usuário é obrigatório."});
    }else{
        let usuario = new Usuario(body);
    
        usuario.save((err, doc) => {
            if(err){
                if(err.code === 11000){ //Email duplicado
                    res.status(400).json({error: "Já existe um usuário cadastrado com esse email."});
                }else{
                    res.status(500).json({error: "Não foi possível salvar a categoria."});
                }

            }else{
                res.status(200).json(doc);
            }
        });
    }
});

router.post("/logar", (req, res) => {
    autenticacao.logar(req.body.email, req.body.senha, (err, token) => {
        if(err){
            res.status(400).json({error: err.mensagem});
        }else{
            res.status(200).json({token});
        }
    });
});

router.put('/:id', autenticacao.checkAutenticacao, (req, res) => {

    const usuario = req.body;

    if(!usuario.nome || usuario.nome.trim().length < 1){
        res.status(400).json({error: "O nome do usuário é obrigatório."});
    }else if(!usuario.email || usuario.email.trim().length < 1){
        res.status(400).json({error: "O email do usuário é obrigatório."});
    }else if(!usuario.senha || usuario.senha.trim().length < 1){
        res.status(400).json({error: "A senha do usuário é obrigatório."});
    }else{
        Usuario.findByIdAndUpdate(req.params.id, usuario, (err, doc) => {
            if(err){
                if(err.code === 11000){ //Email duplicado
                    res.status(400).json({error: "Já existe um usuário cadastrado com esse email."});
                }else{
                    res.status(500).json({error: "Não foi possível atualizar o usuário."});
                }

            }else{
                if(doc == null){
                    res.status(400).json({error: "Usuário não encontrado."});
                }else{
                    res.status(200).json(doc);
                }
            }
        });
    }
});

router.delete('/:id', autenticacao.checkAutenticacao, (req, res) => {
    Usuario.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível deletar o usuário."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Usuário não encontrado."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

module.exports = router;