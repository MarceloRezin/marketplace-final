const express = require("express");
const router = express.Router();
const Avaliacao = require('../models/avaliacao');

router.get("/", (req, res) => {

    const descricaoQuery = req.query.descricao;
    let query = {};
    if(descricaoQuery && descricaoQuery.trim().length > 0) {
        query = {descricao: new RegExp(descricaoQuery, 'i')};
    }

    const limitQuery = req.query.limit;
    let limit = null;
    if(limitQuery && limitQuery.trim().length > 0) {
        limit = parseInt(limitQuery);
    }

    Avaliacao.find(query).populate("anuncio").populate("usuario").limit(limit).exec((err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível listar as avaliações."});
        }else{
            res.status(200).json(doc);
        }
    });
});

router.get("/:id", (req, res) => {
    Avaliacao.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível buscar a avaliação."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Avaliação não encontrada."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

router.post("/", (req, res) => {

    const body = req.body;

    if(!body.descricao || body.descricao.trim().length < 1){
        res.status(400).json({error: "A descrição da avaliação é obrigatória."});
    }else if(!body.usuario || !body.usuario._id){
        res.status(400).json({error: "O usuário da avaliação é obrigatório."});
    }else if(!body.anuncio || !body.anuncio._id){
        res.status(400).json({error: "O anúncio da avaliação é obrigatório."});
    }else{
        let avaliacao = new Avaliacao(body);
    
        avaliacao.save((err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível salvar a avaliação."});
            }else{
                res.status(200).json(doc);
            }
        });
    }
});

router.put('/:id', (req, res) => {

    const avaliacao = req.body;

    if(!avaliacao.descricao || avaliacao.descricao.trim().length < 1){
        res.status(400).json({error: "A descrição da avaliação é obrigatória."});
    }else if(!avaliacao.usuario || !avaliacao.usuario._id){
        res.status(400).json({error: "O usuário da avaliação é obrigatório."});
    }else if(!avaliacao.anuncio || !avaliacao.anuncio._id){
        res.status(400).json({error: "O anúncio da avaliação é obrigatório."});
    }else{
        Avaliacao.findByIdAndUpdate(req.params.id, avaliacao, (err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível atualizar a avaliação."});
            }else{
                if(doc == null){
                    res.status(400).json({error: "Avaliação não encontrada."});
                }else{
                    res.status(200).json(doc);
                }
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    Avaliacao.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível deletar a avaliação."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Avaliação não encontrada."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

module.exports = router;