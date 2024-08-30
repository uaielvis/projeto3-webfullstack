const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Ajuste o caminho conforme a estrutura do seu projeto

// Substitua 'your-db-name' pelo nome real do seu banco de dados
const dbUri = 'mongodb://localhost:27017/projeto3-db'; 

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado ao MongoDB');
    return seedUser();
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });

const seedUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('testpassword', salt);

    const user = new User({
      username: 'testuser',
      password: hashedPassword
    });

    await user.save();
    console.log('Usuário seedado com sucesso!');
  } catch (err) {
    console.error('Erro ao seedar o usuário', err);
  } finally {
    mongoose.connection.close();
  }
};
