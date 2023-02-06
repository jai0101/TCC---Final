
const mongoose = require('../config/conexao')
const Schema = mongoose.Schema

var UsuarioSchema = new Schema({
    nome1:{type:String},
    nome2:{type:String},
    email: {type:String},
    senha: {type:String},
    foto: {type:String}

})

module.exports = mongoose.model("Usuario", UsuarioSchema)