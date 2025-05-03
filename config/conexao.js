require('dotenv').config(); // Carrega as variáveis do .env

const mongoose = require('mongoose');

// Define a opção para lidar com avisos futuros do Mongoose
mongoose.set('strictQuery', true);

// Pega a URI do MongoDB do .env
const uri = process.env.MONGO_URI;

// Verifica se a URI está definida
if (!uri) {
    console.error('❌ Erro: A variável de ambiente MONGO_URI não está definida.');
    process.exit(1);
}

// Conecta ao MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log('✅ Conectado ao MongoDB com sucesso!');
    })
    .catch((error) => {
        console.error('❌ Erro na conexã
