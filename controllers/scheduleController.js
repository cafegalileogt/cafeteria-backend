const { updateShedule, schedule, createScheduleException, getScheduleException, deleteScheduleException, checkScheduleAndExceptions } = require('../models/scheduleModel');


// Actualizar un horario existente

const putShedule = async (req, res) => {
    const { dia } = req.params;
    const shedule = req.body;
    try {
        const result = await updateShedule(dia, shedule);
        res.status(200).json({ message: 'Horario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el horario', details: error.message });
    }
};

// Obtener horarios
const getShedule = async (req, res) => {
    try {
        const result = await schedule();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los horarios', details: error.message});
    }
};

// Crear una excepcion
const postException = async (req, res) => {
    const exception = req.body;
    try {
        const result = await createScheduleException(exception);
        res.status(201).json({ message: 'Excepción creada exitosamente', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la excepción', details: error.message});
    }
};

const getException = async (req, res) => {
    try {
        const result = await getScheduleException();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la excepción', details: error.message });
    }
};


// Eliminar una excepcion
const deleteException = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteScheduleException(id);
        res.status(200).json({ message: 'Excepción eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la excepción', details: error.message });
    }
};

const verifyScheduleAndExceptions = async (req, res) => {
    try {
        const result = await checkScheduleAndExceptions();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar horarios y excepciones', details: error.message});
    }
};

module.exports = {
    putShedule,
    getShedule,
    postException,
    getException,
    deleteException,
    verifyScheduleAndExceptions
};
