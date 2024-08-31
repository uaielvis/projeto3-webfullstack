const mongoose = require('mongoose');
const User = require('./models/User'); // Assumindo que seu modelo está no diretório models
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Could not connect to MongoDB', err);
});

async function createUser() {
    try {
        const user = new User({
            username: "testeusuario",
            email: "teste@exemplo.com",
            password: "123456" // A senha será criptografada automaticamente pelo middleware
        });

        await user.save();
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        mongoose.disconnect();
    }
}

createUser();
