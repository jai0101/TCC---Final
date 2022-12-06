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

module.exports = {
    abreindex,
    abredescricao,
    abredesenvolvedora,
    abrelogin,
    abreregistrar
}
