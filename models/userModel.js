const db = require('../config/db');


const findUserByEmail = async (email) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [email], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const findUserBCorreo = async (email) => {
  const sql = 'SELECT * FROM usuarios WHERE correo_institucional = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [email], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const updatePassword = async (email, hashedPassword) => {
  const sql = 'UPDATE users SET password = ? WHERE email = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [hashedPassword, email], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};


module.exports = {
  findUserByEmail,
  updatePassword,
  findUserBCorreo
}