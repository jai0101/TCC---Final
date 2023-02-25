var passport = require('passport');
var LocalStrategy = require('passport-local');
const Usuario = require('../models/usuario');
const Destinatario = require ('../models/destinatario');

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    
    const usuario = await Usuario.findOne({
        username: username
    })
    if (!usuario) {
        
        return cb(null, false, {
            message: 'Usuário não encontrado!'
        });
    } else {
        if (usuario.password != password) {
            return cb(null, false, {
                message: 'Senha incorreta!'
            });
        } else {
            console.log('ok')
            return cb(null, usuario);
        }
    }
}));

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

passport.deserializeUser(function (usuario, cb) {
    process.nextTick(function () {
        return cb(null, usuario);
    });
});

passport.serializeUser(function (destinatario, cb) {
    process.nextTick(function () {
        cb(null, {
            id: destinatario._id,
            nome: destinatario.nome,
            email: destinatario.email,
            pix: destinatario.pix,
            mensagem: destinatario.mensagem
    
        });
    });
});

passport.deserializeUser(function (destinatario, cb) {
    process.nextTick(function () {
        return cb(null, destinatario);
    });
});


module.exports = passport