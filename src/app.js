(function () {
    'use strict';
}());

const express = require('express');
const moment = require('moment');
const {v4: uuidv4} = require('uuid');
const Usuario = require('./models/Usuario');

const app = express();

app.use(express.json());

app.locals.listaUsuarios = [];

app.post('/usuario/cadastrar', (req, res) => {
    if (!req.body.nome || /^\s+$/.test(req.body.nome)) {
        res.status(400).json({'mensagem': 'Nome não pode ser vazio'});
        return;
    }

    if (!req.body.email || /^\s+$/.test(req.body.email)) {
        res.status(400).json({'mensagem': 'E-mail não pode ser vazio'});
        return;
    }

    if (!req.body.senha || /^\s+$/.test(req.body.senha)) {
        res.status(400).json({'mensagem': 'Senha não pode ser vazia'});
        return;
    }

    let usuario = req.app.locals.listaUsuarios.find(u => {
        return u.email === req.body.email;
    });

    if (usuario !== undefined) {
        res.status(400).json({'mensagem': 'E-mail já existente'});
        return;
    }

    usuario = new Usuario(
        req.body.nome,
        req.body.email,
        req.body.senha,
        req.body.telefones
    );

    req.app.locals.listaUsuarios.push(usuario);

    res.json({
        'id': usuario.id,
        'data_criacao': usuario.data_criacao,
        'data_atualizacao': usuario.data_atualizacao,
        'token': usuario.token
    });
});

app.post('/usuario/entrar', (req, res) => {
    const indexUsuario = req.app.locals.listaUsuarios.findIndex(u => {
        return u.email === req.body.email && u.senha === req.body.senha;
    });

    if (indexUsuario === -1) {
        res.status(401).json({'mensagem': 'Usuário e/ou senha inválidos'});
        return;
    }

    const usuario = req.app.locals.listaUsuarios[indexUsuario];
    usuario.data_atualizacao = new Date();
    usuario.ultimo_login = new Date();
    usuario.token = Buffer.from(uuidv4()).toString('base64');

    req.app.locals.listaUsuarios[indexUsuario] = usuario;

    res.json({
        'id': usuario.id,
        'data_criacao': usuario.data_criacao,
        'data_atualizacao': usuario.data_atualizacao,
        'token': usuario.token
    });
});

app.get('/usuario/buscar', (req, res) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(401).json({'mensagem': 'Não autorizado'});
        return;
    }

    const token = auth.substring(7, auth.length);

    const usuario = req.app.locals.listaUsuarios.find(u => {
        return u.token === token;
    });

    if (usuario === undefined) {
        res.status(401).json({'mensagem': 'Acesso negado'});
        return;
    }

    const ultimo_login = moment(usuario.ultimo_login);
    const diferencaTempo = moment().diff(ultimo_login, 'minutes');

    if (diferencaTempo > 30) {
        res.status(401).json({'mensagem': 'Sessão inválida'});
        return;
    }

    res.json({
        'id': usuario.id,
        'data_criacao': usuario.data_criacao,
        'data_atualizacao': usuario.data_atualizacao,
        'token': usuario.token
    });
});

app.listen(80, () => {
    console.log(`Servidor rodando na porta ${80}`);
});