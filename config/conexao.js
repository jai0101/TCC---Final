const mongoose = require('mongoose');

// Substitua a senha diretamente na string (evite isso em produção, use variáveis de ambiente!)
const uri = 'mongodb+srv://jaisasudati:soldadoinvernal@cluster0.hgchmix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Conecta ao MongoDB Atlas
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB Atlas:', err));

module.exports = mongoose;
