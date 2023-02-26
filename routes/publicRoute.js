const express = require('express')
const router = express.Router()
const publicController = require('../controller/publicController')
const passport = require('../config/passport')
const bloqueio = require('../config/bloqueio')
var upload = require ('../config/configMulter')

router.get('/',publicController.abreindex)
router.get('/descricao',publicController.abredescricao)
router.get('/desenvolvedora',publicController.abredesenvolvedora)
router.get('/conteudo',publicController.abreconteudo)
router.get('/login',publicController.abrelogin)
router.get('/perfil',publicController.abreperfil)
router.get('/registrar',publicController.abreregistrar)
router.get('/addconteudo',publicController.adicionarconteudo)
router.post('/registrar', upload.single("foto"), publicController.enviaregistrar)
router.get('/doacao',publicController.abredoacao)
router.post('/enviadoacao', publicController.enviadoacao)
router.get('/mensagem',publicController.mostrarmensagem)
router.get('/listar',publicController.abrirlistar)
router.get('/del/:id',publicController.deletar)
router.get('/edit/:id',publicController.editar)
router.post('/edit/:id', publicController.enviaeditar)
router.get('/geografia',publicController.abreGeografia)
router.get('/historia',publicController.abreHistoria)
router.get('/quimica',publicController.abreQuimica)
router.get('/fisica',publicController.abreFisica)
router.get('/portugues',publicController.abrePortugues)
router.get('/matematica',publicController.abreMatematica)
router.get('/literatura',publicController.abreLiteratura)
router.get('/biologia',publicController.abreBiologia)
router.get('/artes',publicController.abreArtes)
router.get('/filosofia',publicController.abreFilosofia)


router.post('/login', passport.authenticate('local', {
    successRedirect: '/perfil',
    failureRedirect: '/registrar',
}))

router.get('/', bloqueio, publicController.abreindex)

//rota para registrar
//router.post('/registrar',conexao.single('foto'), publicController.abreregistrar)
module.exports = router