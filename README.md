
# usuariosApi-expressjs

Este é um projeto em node.js utilizando express.js. Onde desenvolvi uma API RESTful para autenticação de usuários, que permite operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.
## Pré-requisitos
Para rodar o projeto, é preciso ter o Node.js instalado na máquina.
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/monise91/usuariosApi-expressjs.git
```

Entre no diretório do projeto

```bash
  cd usuariosApi-expressjs
```

Instale as dependências

```bash
  npm install
```

Execute o comando

```bash
  node app
```

A API irá iniciar localmente na porta 8080.

Para acessar, digite http://localhost:8080 no seu navegador.


## Documentação da API

#### Cadastra um usuário

```http
  POST /usuario/cadastrar
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. O nome do usuário |
| `email` | `string` | **Obrigatório**. O e-mail do usuário |
| `senha` | `string` | **Obrigatório**. A senha do usuário |
| `telefones` | `Array` | Uma lista de números de telefone e DDD |

#### Valida as credenciais de um usuário

```http
  POST /usuario/entrar
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. O e-mail do usuário que irá realizar o login |
| `senha`      | `string` | **Obrigatório**. A senha do usuário que irá realizar o login |

#### Busca as informações de um usuário

```http
  GET /usuario/buscar
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `Header` | **Obrigatório**. O token gerado ao realizar o login com o sufixo `Bearer ` |

## Autora

- [@monise91](https://www.github.com/monise91)
