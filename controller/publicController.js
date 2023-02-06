var Usuario = require('../models/usuario')

async function abreindex(req,res) {
    res.render('index',{Admin:req.user})
}

async function abredescricao(req,res) {
    res.render('descricao',{Admin:req.user})
}

async function abredesenvolvedora(req,res) {
    res.render('desenvolvedora',{Admin:req.user})
}

async function abrelogin(req,res) {
    res.render('login')
}

async function abreregistrar(req,res) {
    res.render('registrar')
}

async function enviaregistrar(req,res) {
    var usuario = new Usuario ({
        nome1: req.body.txtNome1,
        nome2: req.body.txtNome2,
        email: req.body.txtEmail,
        senha: req.body.txtSenha,
        foto: req.body.txtFoto

    })
    usuario.save(function(err){
        
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/');
        }
    })
}

module.exports = {
    abreindex,
    abredescricao,
    abredesenvolvedora,
    abrelogin,
    abreregistrar,
    enviaregistrar
}
