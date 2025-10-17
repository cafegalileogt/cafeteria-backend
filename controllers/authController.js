const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, updatePassword, activateUser } = require('../models/userModel');
require('dotenv').config();
const path = require("path");
const { resetPasswordTemplate } = require('../utils/resetPassword');
const { sendResetPasswordEmail } = require('../utils/emailSender');


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await findUserByEmail(email);
        if (!result || result.length === 0) {
            return res.status(401).json({ message: "Usuario invalido" });
        }
        const user = result[0];
        if (user.is_active === 0) {
            return res.status(401).json({ message: "Debes activar tu cuenta antes de iniciar sesión." });
        }
        const validPassword = await bcrypt.compare(password, user.contrasena);
        console.log('Contraseña válida', validPassword);

        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña inválida" });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                role: user.id_role,
                correo: user.correo_institucional,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Expira en 1 día
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


        const resetLink = `http://localhost:${process.env.PORT}/api/v1/auth/reset-password/${token}`;
        const html = resetPasswordTemplate.replace('{{token}}', token);

        sendResetPasswordEmail(email, 'Restablecimiento de contraseña', html);
        res.status(200).json({
            url: resetLink,
            message: 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico. El enlace expirará en 15 minutos.',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al recuperar contraseña' });
    }
};


const resetPassword = async (req, res) => {
    console.log("entro al controlador")

    const { token } = req.params;
    const { newPassword } = req.body;
    console.log("cuerpo", req.body)
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
        const successPage = path.join(__dirname, "../utils/activatedUser.html");
        res.sendFile(successPage);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Token inválido o expirado' });
    }
};


const authUser = (req, res, next) => {
    
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No autorizado, falta el token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};


module.exports = {
    login,
    logout,
    forgotPassword,
    resetPassword,
    activateAccount,
    authUser
};