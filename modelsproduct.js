const db = require('../config/db');

// Buscar usuario por email
exports.findUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Actualizar contraseña
exports.updateUserPassword = (email, hashedPassword, callback) => {
  db.query(
    'UPDATE users SET password = ? WHERE email = ?',
    [hashedPassword, email],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};
