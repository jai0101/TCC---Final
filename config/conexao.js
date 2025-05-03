// config/conexao.js

require('dotenv').config();  // Carregar as variáveis do arquivo .env

const mongoose = require('mongoose');

// Acessando a variável MONGO_URI do arquivo .env
const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('❌ Erro: A variável de ambiente MONGO_URI não está definida.');
    process.exit(1); // Se não tiver a variável, para o servidor
}

mongoose.connect(uri)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((error) => {
        console.error('Erro na conexão:', error);
    });

module.exports = mongoose;
