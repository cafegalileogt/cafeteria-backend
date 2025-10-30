const db = require('../config/db');


// Actualizar un horario existente
const updateShedule = async (diaSemana, shedule) => {
    const sql = 'UPDATE horario SET ? WHERE dia_semana = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [shedule, diaSemana], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Obtener horarios
const schedule = async (weekStart, weekEnd) => {
    const sql = 'SELECT * FROM horario';
    return new Promise((resolve, reject) => {
        db.query(sql, [weekStart, weekEnd], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = {
  updateShedule,
  schedule,
};