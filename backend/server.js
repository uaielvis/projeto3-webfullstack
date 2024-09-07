const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const redis = require('redis');
const client = redis.createClient();
require('dotenv').config();

// Conectar ao Redis
client.on('connect', () => {
  console.log('Conectado ao Redis');
});

client.on('error', (err) => {
  console.log('Erro no Redis:', err);
});

// Define a porta do servidor
const PORT = process.env.PORT || 5000;

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

// Configurando o roteador de versículos
const versesRouter = require('./routes/verses');
app.use('/api/verses', versesRouter);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
