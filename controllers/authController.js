const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { findUserByEmail, updatePassword } = require('../models/userModel');

require('dotenv').config();


const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const users = await findUserByEmail(email);
        if (users.length === 0)
            return res.status(400).json({ message: 'Email no registrado' });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });


        res.json({ message: `Recuperar contraseña: http://localhost:${process.env.PORT}/api/v1/auth/reset-password/${token}` });
    } catch (err) {
        res.status(500).json({ message: 'Error al recuperar contraseña' });
    }
};


const resetPassword = async (req, res) => {
    
    const { token } = req.params;
    const { newPassword } = req.body;

    try {

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await updatePassword(email, hashedPassword);

        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (err) {
        res.status(400).json({ message: 'Token inválido o expirado' });
    }
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({messsage: 'Unauthorized'});

    try{
        const tokenWithoutBearer = token.replace('Barer ', '');
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(error){
        res.status(401).json({ messsage: 'Inalid Token' });
    }
}

module.exports = {
    forgotPassword,
    resetPassword, 
    authenticateToken
};