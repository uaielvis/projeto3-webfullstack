const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ajuste o caminho conforme necessário

// Função de controle para o login
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Verifique se o usuário existe
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verifique se a senha está correta
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao verificar a senha' });
        }
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Crie um token JWT
        const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

        // Envie o token como resposta
        res.status(200).json({ token });
    });
};
