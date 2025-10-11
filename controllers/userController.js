const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { findUserBCorreo } = require('../models/userModel');

 const loginUsers = async (req, res) => {
  try {
    const { correo_institucional, contrasena } = req.body;

    const [user] =  await findUserBCorreo(correo_institucional);
    if (user.length === 0) {
      return res.status(401).json({ message: "invalido" });
    }

    // const isMatch = await bcrypt.compare(contrasena, user[0].contrasena);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Contraseña inválida" });
    // }
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
    res.cookie("usuarioToken", token, {
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

const logoutUsers = (req, res) => {
  res.clearCookie("usuarioToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Sesión cerrada correctamente" });
};


module.exports = {
  loginUsers,
  logoutUsers 
}