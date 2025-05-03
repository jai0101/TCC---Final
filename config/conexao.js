require('dotenv').config(); // Carrega as variáveis do .env

const mongoose = require('mongoose');

// Aqui, acessamos a variável MONGO_URI que está no .env
const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('Erro: A variável de ambiente MONGO_URI não está definida.');
    process.exit(1); // Se a variável não existir, o processo é interrompido
}

mongoose.connect(uri)
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((error) => {
        console.error('Erro na conexão:', error);
    });

module.exports = mongoose;
