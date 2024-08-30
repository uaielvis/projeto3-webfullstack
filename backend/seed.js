const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Atualizado para bcryptjs
const User = require('./models/User'); // Ajuste o caminho conforme sua estrutura

mongoose.connect('mongodb://localhost:27017/projeto3-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
});

const seedUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('testpassword', salt);

  const user = new User({
    username: 'testuser',
    password: hashedPassword
  });

  await user.save();
  console.log('User seeded!');
  mongoose.connection.close();
};

seedUser();
