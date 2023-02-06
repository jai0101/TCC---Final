const express = require('express')
const router = express.Router()
const publicController = require('../controller/publicController')

router.get('/',publicController.abreindex)
router.get('/descricao',publicController.abredescricao)
router.get('/desenvolvedora',publicController.abredesenvolvedora)
router.get('/login',publicController.abrelogin)
router.get('/registrar',publicController.abreregistrar)
router.post('/registrar',publicController.enviaregistrar)


//rota para registrar
//router.post('/registrar',conexao.single('foto'), publicController.abreregistrar)
module.exports = router