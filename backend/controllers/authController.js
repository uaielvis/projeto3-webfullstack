const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Este é um exemplo simples de um banco de dados de usuários
const users = [
    {
        id: 1,
        username: 'usuarioTeste',
        password: '$2a$10$7tOgXtbB97B3RrM8xIYGAOt8hxXDeH6fYlJqYdKT1kP8qP9ewj.Xm' // senha: "senhaSegura123"
    }
];

// Função de controle para o login
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Verifique se o usuário existe
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verifique se a senha está correta
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Crie um token JWT
    const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

    // Envie o token como resposta
    res.status(200).json({ token });
};
