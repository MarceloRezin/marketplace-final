const express = require("express");
const router = express.Router();
const Categoria = require('../models/categoria');

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

    Categoria.find(query).limit(limit).exec((err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível listar as categorias."});
        }else{
            res.status(200).json(doc);
        }
    });
});

router.get("/:id", (req, res) => {
    Categoria.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível buscar a categoria."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Categoria não encontrada."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

router.post("/", (req, res) => {

    const body = req.body;

    if(!body.nome || body.nome.trim().length < 1){
        res.status(400).json({error: "O nome da categoria é obrigatório."});
    }else{
        let categoria = new Categoria(body);
    
        categoria.save((err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível salvar a categoria."});
            }else{
                res.status(200).json(doc);
            }
        });
    }
});

router.put('/:id', (req, res) => {

    const categoria = req.body;

    if(!categoria.nome || categoria.nome.trim().length < 1){
        res.status(400).json({error: "O nome da categoria é obrigatório."});
    }else{
        Categoria.findByIdAndUpdate(req.params.id, categoria, (err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível atualizar a categoria."});
            }else{
                if(doc == null){
                    res.status(400).json({error: "Categoria não encontrada."});
                }else{
                    res.status(200).json(doc);
                }
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    Categoria.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível deletar a categoria."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Categoria não encontrada."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

module.exports = router;