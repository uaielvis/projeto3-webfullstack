const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Certifique-se de que o caminho está correto

mongoose.connect('mongodb://localhost:27017/projeto3-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
});

const seedUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('356412', salt); // Use a senha correta

    const user = new User({
      username: 'alice',
      password: hashedPassword
    });

    await user.save();
    console.log('User seeded!');
  } catch (err) {
    console.error('Erro ao semear o usuário:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedUser();
