
# Marketplace
Api de gerenciamento de um marketplace

## Recursos:  

### Usuários:
#### GET&nbsp;&nbsp;&nbsp; /usuarios&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Lista todos os usuários registrados_

##### Query params:
| param | Descrição |
|--|--|
| nome | Filtro pelo valor especificado utilizando o operador _LIKE_ |
| limit | Limita a quantidade de registros retornados |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/usuarios
```
##### Retorno:
Retorna a lista de usuários registrados de acordos com os query params informados.
```
[
	{
		"_id": "id",
		"nome": "nome-usuario1",
		"email": "email",
		"senha": "psw",
		"__v":0
	},
	{
		"_id": "id",
		"nome": "nome-usuario2",
		"email": "email", 
		"senha":"psw",
		"__v":0
	}
]
```
---
#### GET&nbsp;&nbsp;&nbsp; /usuarios/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Retorna um usuário específico_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id do usuário que se deseja recuperar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/usuarios/id-do-usuário
```
##### Retorno:
Retorna os dados do usuário requisitado.
```
{
	"_id": "id",
	"nome": "Nome do Usuário",
	"email": "email@email.com",
	"senha":"psw",
	"__v":0
}
```
---
#### POST&nbsp;&nbsp;&nbsp; /usuarios&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Cria um usuário_

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| nome* | String | Nome do usuário que será exibido
| email* | String | Identificador que será usado no momento do login |
| senha* | String | Senha de autenticação definida pelo usuário |
| endereco | String | Endereço do usuário |

##### Autenticação:
Sem autenticação;

##### Exemplo:
```
curl -H "Content-Type: application/json" --request POST --data '{"nome":"Nome do Usuário", "email":"email@email.com", "senha":"psw"}' http://localhost:3000/usuarios
```
##### Retorno:
Retorna o usuário criado.
```
{
	"_id": "id",
	"nome": "Nome do Usuário",
	"email": "email@email.com",
	"senha":"psw",
	"__v":0
}
```
---
#### POST&nbsp;&nbsp;&nbsp; /usuarios/logar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Efetua o login de um usuário_

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| email* | String | Email do usuário |
| senha* | String | Senha do usuário |

##### Autenticação:
Sem autenticação;

##### Exemplo:
```
curl -H "Content-Type: application/json" --request POST --data '{"email":"email@email.com", "senha":"psw"}' http://localhost:3000/usuarios/logar
```
##### Retorno:
Retorna o token de acesso que possibilita o uso que recursos que requerem autenticação.
```
{
	"token": "seu-token-de-acesso"
}
```
---
#### PUT&nbsp;&nbsp;&nbsp; /usuarios/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Atualiza um usuário_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id do usuário que se deseja atualizar |


##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| nome* | String | Nome do usuário que será exibido
| email* | String | Identificador que será usado no momento do login |
| senha* | String | Senha de autenticação definida pelo usuário |
| endereco | String | Endereço do usuário |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request PUT --data '{"nome":"Nome do Usuário", "email":"email@email.com", "senha":"psw"}' http://localhost:3000/usuarios/id-do-usuário
```
##### Retorno:
Retorna a versão anterior do usuário.
```
{
	"_id": "id",
	"nome": "Nome do Usuário Anterior",
	"email": "email@email.com",
	"senha":"psw",
	"__v":0
}
```
---
#### DELETE&nbsp;&nbsp;&nbsp; /usuarios/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Remove um usuário_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id do usuário que se deseja deletar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request DELETE http://localhost:3000/usuarios/id-do-usuário
```
##### Retorno:
Retorna o usuário removido.
```
{
	"_id": "id",
	"nome": "Nome do Usuário Removido",
	"email": "email@email.com",
	"senha":"psw",
	"__v":0
}
```
---
### Categorias:
#### GET&nbsp;&nbsp;&nbsp; /categorias&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Lista todas as categorias registradas_

##### Query params:
| param | Descrição |
|--|--|
| nome | Filtro pelo valor especificado utilizando o operador _LIKE_ |
| limit | Limita a quantidade de registros retornados |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/categorias
```
##### Retorno:
Retorna a lista de categorias registradas de acordos com os query params informados.
```
[
	{
		"_id": "id",
		"nome": "nome1",
		"descricao": "descricao"
		"__v":0
	},
	{
		"_id": "id",
		"nome": "nome2",
		"descricao": "descricao"
		"__v":0
	}
]
```
---
#### GET&nbsp;&nbsp;&nbsp; /categorias/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Retorna uma categoria específica_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da categoria que se deseja recuperar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/categorias/id-da-categoria
```
##### Retorno:
Retorna os dados da categoria requisitada.
```
{
	"_id": "id",
	"nome": "Nome da Categoria",
	"descricao": "descricao",
	"__v":0
}
```
---
#### POST&nbsp;&nbsp;&nbsp; /categorias&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _Cria uma categoria_

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| nome* | String | Nome da categoria |
| descricao | String | Breve descrição que ajuda os usuário entenderem a categoria |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request POST --data '{"nome":"Nome da Categoria", "descricao":"descricao"}' http://localhost:3000/categorias
```
##### Retorno:
Retorna a categoria criada.
```
{
	"_id": "id",
	"nome": "Nome do Categoria",
	"descricao": "descricao"
	"__v":0
}
```
---
#### PUT&nbsp;&nbsp;&nbsp; /categorias/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Atualiza uma categoria_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da categoria que se deseja atualizar |

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| nome* | String | Nome da categoria |
| descricao | String | Breve descrição que ajuda os usuário entenderem a categoria |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request PUT --data '{"nome":"Nome da Categoria", "descricao":"descricao"}' http://localhost:3000/categorias/id-da-categoria
```
##### Retorno:
Retorna a versão anterior da categoria.
```
{
	"_id": "id",
	"nome": "Nome do Categoria Anterior",
	"descricao": "descricao"
	"__v":0
}
```
---
#### DELETE&nbsp;&nbsp;&nbsp; /categorias/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Remove uma categoria_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da categoria que se deseja deletar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request DELETE http://localhost:3000/categorias/id-da-categoria
```
##### Retorno:
Retorna a categoria removida.
```
{
	"_id": "id",
	"nome": "Nome do Categoria Removida",
	"descricao": "descricao"
	"__v":0
}
```
---
### Anúncios:
#### GET&nbsp;&nbsp;&nbsp; /anuncios&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Lista todos os anúncios registrados_

##### Query params:
| param | Descrição |
|--|--|
| nome | Filtro pelo valor especificado utilizando o operador _LIKE_ |
| limit | Limita a quantidade de registros retornados |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/anuncios
```
##### Retorno:
Retorna a lista de anúncios registrados de acordos com os query params informados.
```
[
	{
		"_id": "id",
		"nome": "Nome do Anúncio1",
		"usuario": "id-do-usuario",
		"valor": {"$numberDecimal":"valorNumerico"},
		"__v":0
	},
	{
		"_id": "id",
		"nome": "Nome do Anúncio2",
		"usuario": "id-do-usuario",
		"valor": {"$numberDecimal":"valorNumerico"},
		"__v":0
	}
]
```
---
#### GET&nbsp;&nbsp;&nbsp; /anuncios/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Retorna um anúncio específico_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id do anúncio que se deseja recuperar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/anuncios/id-do-anuncio
```
##### Retorno:
Retorna os dados do anúncios requisitado.
```
{
	"_id": "id",
	"nome": "Nome do Anúncio",
	"usuario": "id-do-usuario",
	"valor": {"$numberDecimal":"valorNumerico"},
	"__v":0
}
```
---
#### POST&nbsp;&nbsp;&nbsp; /anuncios&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _Cria um anúncio_

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| nome* | String | Nome do anúncio |
| descricao | String | Breve descrição com mais detalhes do item anunciado |
| valor* | Decimal | Valor do item anunciado |
| usuario* | Usuario | Usuário que fez o anúncio |
| categoria | Categoria | Categoria do item anunciado para ajudar outros usuários a encontrarem o anúncio |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request POST --data '{"nome":"Nome do Anúncio", "valor":120.30, "usuario":{"_id":"id-do_usuario"}}' http://localhost:3000/anuncios
```
##### Retorno:
Retorna o anúncio criado.
```
{
	"_id": "id",
	"nome": "Nome do Anúncio",
	"usuario": "id-do-usuario",
	"valor": {"$numberDecimal":"120.30"},
	"__v":0
}
```
---
#### PUT&nbsp;&nbsp;&nbsp; /anuncios/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Atualiza um anúncio_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id do anúncio que se deseja atualizar |

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| nome* | String | Nome do anúncio |
| descricao | String | Breve descrição com mais detalhes do item anunciado |
| valor* | Decimal | Valor do item anunciado |
| usuario* | Usuario | Usuário que fez o anúncio |
| categoria | Categoria | Categoria do item anunciado para ajudar outros usuários a encontrarem o anúncio |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request PUT --data '{"nome":"Nome do Anúncio", "valor":120.30, "usuario":{"_id":"id-do_usuario"}}' http://localhost:3000/anuncios/id-do-anuncio
```
##### Retorno:
Retorna a versão anterior do anúncio.
```
{
	"_id": "id",
	"nome": "Nome do Anúncio Anterior",
	"usuario": "id-do-usuario",
	"valor": {"$numberDecimal":"valor-do-anuncio"},
	"__v":0
}
```
---
#### DELETE&nbsp;&nbsp;&nbsp; /anuncios/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Remove um anúncio_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id do anúncio que se deseja deletar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request DELETE http://localhost:3000/anuncios/id-do-anuncio
```
##### Retorno:
Retorna o anúncio removido.
```
{
	"_id": "id",
	"nome": "Nome do Anúncio Removido",
	"usuario": "id-do-usuario",
	"valor": {"$numberDecimal":"valor-do-anuncio"},
	"__v":0
}
```
---
### Avaliações:
#### GET&nbsp;&nbsp;&nbsp; /avaliacoes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Lista todas as avaliações registradas_

##### Query params:
| param | Descrição |
|--|--|
| descricao | Filtro pelo valor especificado utilizando o operador _LIKE_ |
| limit | Limita a quantidade de registros retornados |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/avaliacoes
```
##### Retorno:
Retorna a lista de avaliações registradas de acordo com os query params informados.
```
[
	{
		"_id": "id",
		"descricao": "Avaliação 1",
		"usuario": "id-do-usuario",
		"anuncio": "id-do-anuncio",
		"__v":0
	},
	{
		"_id": "id",
		"descricao": "Avaliação 2",
		"usuario": "id-do-usuario",
		"anuncio": "id-do-anuncio",
		"__v":0
	}
]
```
---
#### GET&nbsp;&nbsp;&nbsp; /avaliacoes/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Retorna uma avaliação específica_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da avaliação que se deseja recuperar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/avaliacoes/id-da-avaliacao
```
##### Retorno:
Retorna os dados da avaliação requisitada.
```
{
	"_id": "id",
	"descricao": "Avaliação",
	"usuario": "id-do-usuario",
	"anuncio": "id-do-anuncio",
	"__v":0
}
```
---
#### POST&nbsp;&nbsp;&nbsp; /avaliacoes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _Cria uma avaliação_

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| descricao* | String | Texto que representa a avaliação em si |
| usuario* | Usuario | Usuário que fez a avaliação |
| anuncio* | Anuncio | Anúncio que o usuário está avaliando |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request POST --data '{"descricao":"Avaliação", "usuario":{"_id":"id-do_usuario"}, "anuncio":{"_id":"id-do_anuncio"}}' http://localhost:3000/avaliacoes
```
##### Retorno:
Retorna a avaliação criada.
```
{
	"_id": "id",
	"descricao": "Avaliação",
	"usuario": "id-do-usuario",
	"anuncio": "id-do-anuncio",
	"__v":0
}
```
---
#### PUT&nbsp;&nbsp;&nbsp; /avaliacoes/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Atualiza uma avaliação_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da avaliação que se deseja atualizar |


##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| descricao* | String | Texto que representa a avaliação em si |
| usuario* | Usuario | Usuário que fez a avaliação |
| anuncio* | Anuncio | Anúncio que o usuário está avaliando |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request PUT --data '{"descricao":"Avaliação", "usuario":{"_id":"id-do_usuario"}, "anuncio":{"_id":"id-do_anuncio"}}' http://localhost:3000/avaliacoes/id-da-avaliacao
```
##### Retorno:
Retorna a versão anterior da avaliação.
```
{
	"_id": "id",
	"descricao": "Avaliação Anterior",
	"usuario": "id-do-usuario",
	"anuncio": "id-do-anuncio",
	"__v":0
}
```
---
#### DELETE&nbsp;&nbsp;&nbsp; /avaliacoes/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Remove uma avaliação_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da avaliação que se deseja deletar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request DELETE http://localhost:3000/avaliacoes/id-da-avaliacao
```
##### Retorno:
Retorna a avaliação removida.
```
{
	"_id": "id",
	"descricao": "Avaliação Removida",
	"usuario": "id-do-usuario",
	"anuncio": "id-do-anuncio",
	"__v":0
}
```
---
### Compras:
#### GET&nbsp;&nbsp;&nbsp; /compras&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Lista todas as compras registradas_

##### Query params:
| param | Descrição |
|--|--|
| usuario | Filtro pelo usuário que fez a compra |
| limit | Limita a quantidade de registros retornados |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/compras
```
##### Retorno:
Retorna a lista de avaliações registradas de acordo com os query params informados.
```
[

	{
		"_id": "id",
		"quantidade": valor-inteiro,
		"valorUnitario": {"$numberDecimal":"valor-decimal"},
		"valorFinal":{ "$numberDecimal":"valor-decimal"},
		"usuario": "id-do-usuario",
		"anuncio":"id-do-anuncio",
		"__v":0
	},
	{
		"_id": "id",
		"quantidade": valor-inteiro,
		"valorUnitario": {"$numberDecimal":"valor-decimal"},
		"valorFinal":{ "$numberDecimal":"valor-decimal"},
		"usuario": "id-do-usuario",
		"anuncio":"id-do-anuncio",
		"__v":0
	}
]
```
---
#### GET&nbsp;&nbsp;&nbsp; /compras/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Retorna uma compra específica_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da compra que se deseja recuperar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request GET http://localhost:3000/compras/id-da-compra
```
##### Retorno:
Retorna os dados da compra requisitada.
```
{
		"_id": "id",
		"quantidade": valor-inteiro,
		"valorUnitario": {"$numberDecimal":"valor-decimal"},
		"valorFinal":{ "$numberDecimal":"valor-decimal"},
		"usuario": "id-do-usuario",
		"anuncio":"id-do-anuncio",
		"__v":0
}
```
---
#### POST&nbsp;&nbsp;&nbsp; /compras&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; _Cria uma compra_

##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| quantidade* | Number | Quantidade de itens comprados |
| valorUnitario* | Decimal | Valor de cada item comprado |
| valorFinal* | Decimal | Valor final da compra |
| usuario* | Usuario | Usuário que fez a compra |
| anuncio* | Anuncio | Anúncio que vende os itens comprados |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request POST --data '{"quantidade": 1, "valorUnitario": 10.50, "valorFinal": 10.50, "usuario":{"_id":"id-do_usuario"}, "anuncio":{"_id":"id-do_anuncio"}}' http://localhost:3000/compras
```
##### Retorno:
Retorna a compra criada.
```
{
		"_id": "id",
		"quantidade": 1,
		"valorUnitario": {"$numberDecimal":"10.50"},
		"valorFinal":{ "$numberDecimal":"10.50"},
		"usuario": "id-do-usuario",
		"anuncio":"id-do-anuncio",
		"__v":0
}
```
---
#### PUT&nbsp;&nbsp;&nbsp; /compras/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Atualiza uma compra_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da compra que se deseja atualizar |



##### Modelagem:
| Atributo | Tipo | Descrição |
|--|--|--|
| quantidade* | Number | Quantidade de itens comprados |
| valorUnitario* | Decimal | Valor de cada item comprado |
| valorFinal* | Decimal | Valor final da compra |
| usuario* | Usuario | Usuário que fez a compra |
| anuncio* | Anuncio | Anúncio que vende os itens comprados |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request PUT --data '{"quantidade": 1, "valorUnitario": 10.50, "valorFinal": 10.50, "usuario":{"_id":"id-do_usuario"}, "anuncio":{"_id":"id-do_anuncio"}}' http://localhost:3000/compras/id-da-compra
```
##### Retorno:
Retorna a versão anterior da compra.
```
{
		"_id": "id",
		"quantidade": valor-inteiro,
		"valorUnitario": {"$numberDecimal":"valor-decimal"},
		"valorFinal":{ "$numberDecimal":"valor-decimal"},
		"usuario": "id-do-usuario",
		"anuncio":"id-do-anuncio",
		"__v":0
}
```
---
#### DELETE&nbsp;&nbsp;&nbsp; /compras/:id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Remove uma compra_

##### Parâmetros:
| Parâmetro | Descrição |
|--|--|
| id | Id da compra que se deseja deletar |

##### Autenticação:
Autenticação por meio do token de acesso enviado como parâmetro `x-access-token` no header da requisição. 

##### Exemplo:
```
curl -H "Content-Type: application/json" -H "x-access-token: seu-token-de-acesso" --request DELETE http://localhost:3000/compras/id-da-compra
```
##### Retorno:
Retorna a avaliação compra.
```
{
		"_id": "id",
		"quantidade": valor-inteiro,
		"valorUnitario": {"$numberDecimal":"valor-decimal"},
		"valorFinal":{ "$numberDecimal":"valor-decimal"},
		"usuario": "id-do-usuario",
		"anuncio":"id-do-anuncio",
		"__v":0
}
```
