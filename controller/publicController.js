var Usuario = require('../models/usuario')
var Destinatario = require('../models/destinatario')


async function abreindex(req,res) {
    res.render('index',{Admin:req.user})
}

async function abredescricao(req,res) {
    res.render('descricao',{Admin:req.user})
}

async function abreconteudo(req,res) {
    res.render('conteudo',{Admin:req.user})
}

async function abredesenvolvedora(req,res) {
    res.render('desenvolvedora',{Admin:req.user})
}

async function abrelogin(req,res) {
    res.render('login')
}

async function abreperfil(req,res) {
    const usuario = await Usuario.findById(req.user.id)
   
    res.render('perfil', {Admin:usuario})
}

async function abredoacao(req,res) {
    res.render('doacao')
    
}

async function mostrarmensagem(req,res) {
    var destinatario = new Destinatario ({
        nome: req.body.nome,
        email: req.body.email,
        pix: req.body.pix,
        mensagem: req.body.mensagem
        
    })
    res.render('mensagem',{destinatario:destinatario})

  
}

async function abrirlistar(req,res) {
    const usuario = await Usuario.find({}).exec(function(err,docs){
    res.render('listar', {Usuarios:docs})
    }) 
   
}

async function abreregistrar(req,res) {
    res.render('registrar')
  
}


async function editar(req,res) {
    Usuario.findById(req.params.id, function(err,docs){
        if(err) {
            console.log(err)
        } else {
            res.render('editar',{Usuario : docs})
        }
    
  })
}

  async function enviaeditar(req,res) {
    Usuario.findByIdAndUpdate(req.params.id,
         {
          nome1: req.body.nome1,
          nome2: req.body.nome2,
          telephone: req.body.telephone,
          profissao: req.body.profissao,
          cidade: req.body.cidade,
          username: req.body.username,
          password: req.body.password

          }, function (err,docs){
            res.redirect('listar')
          }) 
}

async function deletar(req,res) {
    Usuario.findByIdAndDelete (req.params.id,function(err){
        if(err){
            console.log(err)
          }  else {
            res.redirect('/listar')
          }
    })

}


async function adicionarconteudo(req,res) {
    res.render('addconteudo')
  
}

async function enviaregistrar(req,res) {
    var usuario = new Usuario ({
        nome1: req.body.nome1,
        nome2: req.body.nome2,
        telephone: req.body.telephone,
        profissao: req.body.profissao,
        cidade: req.body.cidade,
        username: req.body.username,
        password: req.body.password,
        foto: req.file.filename
        
    })
    usuario.save(function(err){
        
        if(err){
            console.log(err)

        }
        else{
            res.redirect('/');
            console.log(req.body.username)
            console.log(req.body.password)
            console.log(req.body.telephone)

        }

    })
}

async function enviadoacao(req,res) {
    var destinatario = new Destinatario ({
        nome: req.body.nome,
        email: req.body.email,
        pix: req.body.pix,
        mensagem: req.body.mensagem
        
    })
    destinatario.save(function(err){
        
        if(err){
            console.log(err)

        }
        else{
          
            console.log(destinatario.nome)

        }


    }) 

    res.render('mensagem', {destinatario:destinatario});
}

async function logar(req, res){
    
}


module.exports = {
    abreindex,
    abredescricao,
    abredesenvolvedora,
    abreconteudo,
    abrelogin,
    abreregistrar,
    enviaregistrar,
    abreperfil,
    logar,
    abredoacao, 
    mostrarmensagem,
    adicionarconteudo,
    abrirlistar,
    deletar,
    editar,
    enviaeditar, 
    enviadoacao
    
}
