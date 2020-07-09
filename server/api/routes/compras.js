const express = require("express");
const router = express.Router();
const Compra = require('../models/compra');

router.get("/", (req, res) => {

    const usuarioQuery = req.query.usuario;
    let query = {};
    if(usuarioQuery && usuarioQuery.trim().length > 0) {
        query = {usuario: usuarioQuery};
    }

    const limitQuery = req.query.limit;
    let limit = null;
    if(limitQuery && limitQuery.trim().length > 0) {
        limit = parseInt(limitQuery);
    }

    Compra.find(query).limit(limit).exec((err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível listar as compras."});
        }else{
            res.status(200).json(doc);
        }
    });
});

router.get("/:id", (req, res) => {
    Compra.findById(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível buscar a compra."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Compra não encontrada."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

router.post("/", (req, res) => {

    const body = req.body;

    if(!body.quantidade){
        res.status(400).json({error: "A quantidade da compra é obrigatória."});
    }else if(!body.valorUnitario){
        res.status(400).json({error: "O valor unitário da compra é obrigatório."});
    }else if(!body.valorFinal){
        res.status(400).json({error: "O valor final da compra é obrigatório."});
    }else if(!body.usuario || !body.usuario._id){
        res.status(400).json({error: "O usuário do anúncio é obrigatório."});
    }else if(!body.anuncio || !body.anuncio._id){
        res.status(400).json({error: "O anúncio da compra é obrigatório."});
    }else{
        let compra = new Compra(body);
    
        compra.save((err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível salvar a compra."});
            }else{
                res.status(200).json(doc);
            }
        });
    }
});

router.put('/:id', (req, res) => {

    const compra = req.body;

    if(!compra.quantidade){
        res.status(400).json({error: "A quantidade da compra é obrigatória."});
    }else if(!compra.valorUnitario){
        res.status(400).json({error: "O valor unitário da compra é obrigatório."});
    }else if(!compra.valorFinal){
        res.status(400).json({error: "O valor final da compra é obrigatório."});
    }else if(!compra.usuario || !compra.usuario._id){
        res.status(400).json({error: "O usuário do anúncio é obrigatório."});
    }else if(!compra.anuncio || !compra.anuncio._id){
        res.status(400).json({error: "O anúncio da compra é obrigatório."});
    }else{
        Compra.findByIdAndUpdate(req.params.id, compra, (err, doc) => {
            if(err){
                res.status(500).json({error: "Não foi possível salvar a compra."});
            }else{
                if(doc == null){
                    res.status(400).json({error: "Compra não encontrada."});
                }else{
                    res.status(200).json(doc);
                }
            }
        });
    }
});

router.delete('/:id', (req, res) => {
    Compra.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err){
            res.status(500).json({error: "Não foi possível deletar a compra."});
        }else{
            if(doc == null){
                res.status(400).json({error: "Compra não encontrada."});
            }else{
                res.status(200).json(doc);
            }
        }
    });
});

module.exports = router;