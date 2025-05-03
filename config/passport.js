var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

// Estratégia de autenticação local
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        const usuario = await Usuario.findOne({ username: username });
        if (!usuario) {
            return cb(null, false, { message: 'Usuário não encontrado!' });
        }

        // Comparação de senha usando bcrypt
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return cb(null, false, { message: 'Senha incorreta!' });
        }

        console.log('Usuário autenticado com sucesso');
        return cb(null, usuario);
    } catch (err) {
        return cb(err);
    }
}));

// Serialização do usuário (armazenar informações adicionais)
passport.serializeUser(function (usuario, cb) {
    process.nextTick(function () {
        cb(null, {
            id: usuario._id,
            nome1: usuario.nome1,
            nome2: usuario.nome2,
            telephone: usuario.telephone,
            profissao: usuario.profissao,
            cidade: usuario.cidade,
            username: usuario.username,
            password: usuario.password,
            foto: usuario.foto
        });
    });
});

// Deserialização do usuário (buscar o usuário no banco de dados usando o ID)
passport.deserializeUser(async function (usuarioData, cb) {
    try {
        const usuario = await Usuario.findById(usuarioData.id);
        if (!usuario) {
            return cb(new Error('Usuário não encontrado!'));
        }
        process.nextTick(function () {
            return cb(null, usuarioData); // Retornando os dados serializados
        });
    } catch (err) {
        return cb(err);
    }
});

module.exports = passport;
