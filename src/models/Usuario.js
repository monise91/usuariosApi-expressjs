const { v4: uuidv4 } = require('uuid');

module.exports = class Usuario {
    constructor(nome, email, senha, telefones) {
        this.id = uuidv4();

        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefones = telefones;

        this.data_criacao = new Date();
        this.data_atualizacao = null;
        this.ultimo_login = null;
        this.token = null;
    }
};
