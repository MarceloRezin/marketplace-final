const express = require("express");
const router = express.Router();
const Anuncio = require('../models/anuncio');

router.get("/", (req, res) => {

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

    Anuncio.find(query).limit(limit).exec((err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível listar os anúncios."});
        }else{
            res.status(200).json(doc);
        }
    });
});

router.get("/:id", (req, res) => {
    Anuncio.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível buscar o anúncio."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Anúncio não encontrado."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

router.post("/", (req, res) => {

    const body = req.body;

    if(!body.nome || body.nome.trim().length < 1){
        res.status(400).json({error: "O nome do anúncio é obrigatório."});
    }else if(!body.usuario || !body.usuario._id){
        res.status(400).json({error: "O usuário do anúncio é obrigatório."});
    }else if(!body.valor){
        res.status(400).json({error: "O valor do anúncio é obrigatório."});
    }else{
        let anuncio = new Anuncio(body);
    
        anuncio.save((err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível salvar o anúncio."});
            }else{
                res.status(200).json(doc);
            }
        });
    }
});

router.put('/:id', (req, res) => {

    const anuncio = req.body;

    if(!anuncio.nome || anuncio.nome.trim().length < 1){
        res.status(400).json({error: "O nome do anúncio é obrigatório."});
    }else if(!anuncio.usuario || !anuncio.usuario._id){
        res.status(400).json({error: "O usuário do anúncio é obrigatório."});
    }else if(!anuncio.valor){
        res.status(400).json({error: "O valor do anúncio é obrigatório."});
    }else{    
        Anuncio.findByIdAndUpdate(req.params.id, anuncio, (err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível atualizar o anúncio."});
            }else{
                if(doc == null){
                    res.status(400).json({error: "Anúncio não encontrado."});
                }else{
                    res.status(200).json(doc);
                }
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    Anuncio.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível deletar o anúncio."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Anúncio não encontrado."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

module.exports = router;