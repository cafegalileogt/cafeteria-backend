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
const schedule = async () => {
    const sql = 'SELECT * FROM horario';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Crear una excepcion

const createScheduleException = async (exception) => {
    const sql = 'INSERT INTO excepcion SET ?';
    return new Promise((resolve, reject) => {
        db.query(sql, exception, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Obtener una excepcion

const getScheduleException = async () => {
    const sql = 'SELECT * FROM excepcion';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        }); 
    });
};

// Eliminar una excepcion
const deleteScheduleException = async (exceptionId) => {
    const sql = 'DELETE FROM excepcion WHERE id_exception = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [exceptionId], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Verificar horarios y excepciones

const checkScheduleAndExceptions = async () => {
    // Setear el locale a español
    await new Promise((resolve, reject) => {
        db.query("SET lc_time_names = 'es_ES'", (err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    // Verificamos los horarios y excepciones
    const results = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM horarios_excepciones", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });

    return results;
};

module.exports = {
    updateShedule,
    schedule,
    createScheduleException,
    getScheduleException,
    deleteScheduleException,
    checkScheduleAndExceptions,
};