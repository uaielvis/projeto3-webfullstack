const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// URL de conexão do MongoDB
const dbUri = 'mongodb://localhost:27017/projeto3-db'; // Para MongoDB local

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
});

app.use(cors());
app.use(express.json());

// Configurando o roteador de autenticação
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
