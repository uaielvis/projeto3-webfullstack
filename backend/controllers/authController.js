const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

// Simulando um banco de dados de usuários (para fins de exemplo)
const users = [
    {
        id: 1,
        username: 'usuarioTeste',
        password: '$2a$10$OGbMswSBtZwJTIWzb0Vhpu31v/32bkksPfHZ6GnluPKlJHJoFwvay' // senha: "senhaSegura123"
    }
];

// Função de controle para o login
exports.login = (req, res) => {
    // Sanitizar a entrada para prevenir injeções
    const sanitizedUsername = sanitize(req.body.username);
    const sanitizedPassword = sanitize(req.body.password);

    // Verifique se o usuário existe
    const user = users.find(u => u.username === sanitizedUsername);
    if (!user) {
        console.warn(`Tentativa de login falhada - Usuário não encontrado: ${sanitizedUsername}`);
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verifique se a senha está correta
    bcrypt.compare(sanitizedPassword, user.password, (err, isMatch) => {
        if (err) {
            console.error(`Erro ao verificar a senha para o usuário: ${sanitizedUsername} - ${err.message}`);
            return res.status(500).json({ message: 'Erro ao verificar a senha' });
        }
        if (!isMatch) {
            console.warn(`Tentativa de login falhada - Senha incorreta para o usuário: ${sanitizedUsername}`);
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Crie um token JWT com expiração de 1 hora
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'secreto', // Use uma variável de ambiente para o segredo
            { expiresIn: '1h' }
        );

        // Log da tentativa de login bem-sucedida
        console.info(`Login bem-sucedido para o usuário: ${sanitizedUsername}`);

        // Envie o token como resposta
        res.status(200).json({ token });
    });
};

// Função de controle para logout (invalidação do token)
exports.logout = (req, res) => {
    // Implementação do logout se necessário (por exemplo, blacklist de tokens)
    console.info(`Logout bem-sucedido para o usuário: ${req.user.id}`);
    res.status(200).json({ message: 'Logout bem-sucedido' });
};
