const express = require("express");
const app = express();
const db = require("./api/data/db");
const autenticacao = require("./api/autenticacao/autenticacao");
const cors = require('cors')

const rotaCategorias = require("./api/routes/categorias");
const rotaUsuarios = require("./api/routes/usuarios");
const rotaAnuncios = require("./api/routes/anuncios");
const rotaAvaliacoes = require("./api/routes/avaliacoes");
const rotaCompras = require("./api/routes/compras");

app.use(express.json());
app.use(cors());

app.use("/categorias", autenticacao.checkAutenticacao, rotaCategorias);
app.use("/usuarios", rotaUsuarios); //O controle de acesso é feito dentro da rota de usuário, pois tem alguns recursos que são abertos
app.use("/anuncios", autenticacao.checkAutenticacao, rotaAnuncios);
app.use("/avaliacoes", autenticacao.checkAutenticacao, rotaAvaliacoes);
app.use("/compras", autenticacao.checkAutenticacao, rotaCompras);

app.listen(3001, () => {
    console.log('Aplicação executando na porta 3001.');
});