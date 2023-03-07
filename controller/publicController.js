var Usuario = require('../models/usuario')
var Destinatario = require('../models/destinatario')
var Avaliador = require('../models/avaliador')
var Disciplina = require('../models/disciplina')


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

async function logout(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        // redirecionar para a página de login após o logout
        res.redirect('/login');
      });
}      
  
async function abreperfil(req,res) {
    const usuario = await Usuario.findById(req.user.id)
    const usu_disciplinas = await Disciplina.find({
        usuario: req.params.id
    }) 
    res.render('perfil', { Admin: usuario, Disciplinas: usu_disciplinas })
}


async function abredoacao(req,res) {
    res.render('doacao', {Admin:req.user})
    
}

async function abreavaliacao(req,res) {
    res.render('avaliar', {Admin:req.user})
    
}

async function mostrarmensagem(req, res) {
    const destinatario = await Destinatario.find({}).exec(function (err, docs) {
    if (req.user) {
    res.render("mensagem", { Destinatarios: docs, Admin: req.user });
    } else {
    res.render("mensagem", { Destinatarios: docs });
    }
    });
}

async function mostraravaliacao(req,res) {
    
     const avaliador = await Avaliador.find({}).exec(function (err, docs) {
    if (req.user) {
    res.render("avaliacoes", { Avaliacoes: docs, Admin: req.user });
    } else {
    res.render("avaliacoes", { Avaliacoes: docs });
    }
    });
}

/*async function abrirlistar(req,res) {
    const usuario = await Usuario.find({}).exec(function(err,docs){
    res.render('listar', {Usuarios:docs})
    }) 
   
}*/

async function abrirlistar(req,res) {
    const usuario = await Usuario.find({}).exec(function(err,docs){
        if (req.user) {
            res.render("listar", { Usuarios: docs, Admin: req.user });
            } else {
            res.render("listar", { Usuarios: docs });
            }

    }) 
}

/*async function abreDisciplina(req,res) {
    const disciplinas = await Disciplina.find({
        conteudo:req.params.disciplina
    }) 
    res.render('visualizaconteudo', {Disciplinas:disciplinas, nome:req.params.disciplina, 
        Admin:req.user})
  
}*/

async function abreDisciplina(req, res) {
    const disciplinas = await Disciplina.find({ conteudo: req.params.disciplina });
    
    // Adiciona o caminho relativo do arquivo de material didático a cada disciplina
    disciplinas.forEach(disciplina => {
      disciplina.caminhoMaterial = `/assets/fotos/${disciplina.material}`;
    });
  
    // Renderiza a página "visualizaconteudo", passando as disciplinas e outras informações
    res.render('visualizaconteudo', {
      Disciplinas: disciplinas,
      nome: req.params.disciplina,
      Admin: req.user
    });
  }
  


async function abreregistrar(req,res) {
    res.render('registrar')
  
}


async function editar(req,res) {
    const idbusca = req.params.id 
    const teste =  await Usuario.findOne({_id : idbusca})
    console.log(teste.nome1)

    
         Usuario.findById(req.params.id, function(err,docs){
        if(err) {
            console.log(err)
        } else {
            console.log(docs)
            res.render('editar',{Usuario: docs})
        }
    
  })

}

/*async function perfilunico(req,res) {
    const idbusca = req.params.id 
    const teste =  await Usuario.findOne({_id : idbusca})
    console.log(teste.nome1)

         Usuario.findById(req.params.id, function(err,docs){
        if(err) {
            console.log(err)
        } else {
            console.log(docs)
            res.render('perfilunico',{Usuario: docs})
        }
    
  })

}*/

async function perfilunico(req, res) {
    try{
    const usuario = await Usuario.findById(req.params.id)
     res.render('perfilunico', { usuario, Admin: req.user });
     
  } catch (err) {
    console.log(err);
    res.status(500).send('Ocorreu um erro ao buscar o perfil.');
  }
}

  async function enviaeditar(req,res) {
     Usuario.findByIdAndUpdate(req.user.id,
         {
          nome1: req.body.nome1,
          nome2: req.body.nome2,
          telephone: req.body.telephone,
          profissao: req.body.profissao,
          cidade: req.body.cidade,
          username: req.body.username,
          password: req.body.password,
          foto:req.file.filename

          }, function (err,docs){

            console.log(req.body.nome1)
            res.redirect('/perfil')
          }) 
}

async function deletar(req,res) {
    Usuario.findByIdAndDelete(req.params.id, function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Erro ao excluir usuário');
      } else {
        req.logout(function(err) {
          if (err) {
            console.log(err);
            res.status(500).send('Erro ao fazer logout');
          } else {
            res.redirect('/');
          }
        });
      }
    });
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
        foto:req.file.filename
        
    })
    usuario.save(function(err){
        
        if(err){
            console.log(err)

        }
        else{

            res.redirect('/');
            console.log(req.body.username)

        }

    })
}


async function enviaconteudo(req,res) {
    var disciplina = new Disciplina ({
        conteudo: req.body.conteudo,
        titulo: req.body.titulo,
        material: req.file.filename,
        usuario: req.user.id
    })
    disciplina.save(function(err){
        
        if(err){
            console.log(err)

        }
        else{
            res.redirect('/');
            console.log(req.body.conteudo)

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
          
            res.redirect('mensagem');
            console.log(destinatario.nome)

        }


    }) 

   
}

async function avaliar(req,res) {
    var avaliador = new Avaliador ({
        apelido: req.body.apelido,
        email: req.body.email,
        avaliacao: req.body.avaliacao
        
    })
    avaliador.save(function(err){
        
        if(err){
            console.log(err)

        }
        else{
          
            res.redirect('avaliacoes');
            console.log(avaliador.nome)

        }


    }) 

   
}


async function logar(req, res){
    
}


module.exports = {
    abreindex,
    abredescricao,
    abredesenvolvedora,
    abreconteudo,
    abrelogin,
    logout,
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
    enviadoacao,
    abreDisciplina,
    abreavaliacao,
    avaliar,
    mostraravaliacao,
    enviaconteudo,
    perfilunico
}
