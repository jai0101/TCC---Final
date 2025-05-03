require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const Usuario = require('./models/usuario');
const Disciplina = require('./models/disciplina');
const session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.authenticate('session'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const publicRouter = require('./routes/publicRoute');
app.use('/', publicRouter);

// Rota para download de fotos
app.get('/disciplina/:disciplina/foto/:arquivo', (req, res) => {
    const caminho = path.join(__dirname, 'public', 'assets', 'fotos', req.params.arquivo);
    res.download(caminho);
});

// Rota para listar usuários e disciplinas
app.get('/listar', async function(req, res) {
    const usuarios = await Usuario.find({}).exec();
    const conteudosPorUsuario = [];

    for (let usuario of usuarios) {
        const conteudos = await Disciplina.find({ usuario: usuario._id }).exec();
        conteudosPorUsuario.push(conteudos.length);
    }

    if (req.user) {
        res.render("listar", { Usuarios: usuarios, Admin: req.user, quantidadeConteudos: conteudosPorUsuario });
    } else {
        res.render("listar", { Usuarios: usuarios, quantidadeConteudos: conteudosPorUsuario });
    }
});

// ✅ Porta dinâmica exigida pelo Render
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Servidor rodando na porta ${port}`);
});

 


