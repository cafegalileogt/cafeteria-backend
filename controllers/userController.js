const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const { createUser, findUserByEmail } = require('../models/userModel');


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
      is_active: 0, // default "No activado"
    };

    await createUser(user);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });


    res.status(201).json({
      url: `http://localhost:${process.env.PORT}/api/v1/auth/activate/${token}`,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el registro' });
  }
};


module.exports = {
  registerStudent
}