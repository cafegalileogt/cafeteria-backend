const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { sendActivationEmail } = require ('../utils/emailSender');
const { createUser, findUserByEmail } = require('../models/userModel');
const { emailTemplate } = require('../utils/emailTemplate');

const registerStudent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUsers = await findUserByEmail(email);
    if (existingUsers.length > 0)
      return res.status(400).json({ message: 'Email ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10); // Mejor que 8
    const user = {
      nombre:name,
      correo_institucional: email,
      contrasena: hashedPassword,
      id_rol: 1, // default "Estudiante"
      isActive: 0, // default "No activado"
    };

    await createUser(user);
    console.log('Usuario creado:', user);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const activationLink = `http://localhost:${process.env.PORT}/api/v1/auth/activate/${token}`;


    const html = emailTemplate
    .replace('{{name}}', name)
    .replace('{{activationLink}}', activationLink);

    sendActivationEmail(email, 'Activación de cuenta', html);
    res.status(201).json({url: activationLink,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error en el registro', error: err.message });
  }
};


module.exports = {
  registerStudent
}