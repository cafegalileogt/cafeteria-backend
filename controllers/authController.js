const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { findUserByEmail, updatePassword, activateUser } = require('../models/userModel');

require('dotenv').config();


const login = async (req, res) => {
    try {
        const { correo_institucional, contrasena } = req.body;

        const [user] = await findUserByEmail(correo_institucional);
        if (user.length === 0) {
            return res.status(401).json({ message: "invalido" });
        }

        if (contrasena !== user.contrasena) {
            return res.status(401).json({ message: "Contraseña inválida" });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                role: user.id_role,
                correo: user.correo_institucional,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3m" }
        );
        res.cookie("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3 * 60 * 1000,
        });

        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Error al iniciar sesión", message: error.message });
    }
};


const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({ message: "Sesión cerrada correctamente" });
};


const forgotPassword = async (req, res) => {
    
    const { email } = req.body;

    try {
        const users = await findUserByEmail(email);
        if (users.length === 0)
            return res.status(400).json({ message: 'Email no registrado' });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });


        res.json({
            url: `http://localhost:${process.env.PORT}/api/v1/auth/reset-password/${token}`
        });
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


const activateAccount = async (req, res) => {
    const { token } = req.params;    
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        await activateUser(email);
        res.json({ message: 'Cuenta activada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Token inválido o expirado' });
    }
};




module.exports = {
    login,
    logout,
    forgotPassword,
    resetPassword,
    activateAccount,
};