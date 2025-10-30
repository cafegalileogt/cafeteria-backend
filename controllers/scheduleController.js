const { updateShedule, schedule } = require('../models/scheduleModel');


// Actualizar un horario existente

const putShedule = async (req, res) => {
    const { dia } = req.params;
    const shedule = req.body;
    try {
        const result = await updateShedule(dia, shedule);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el horario' });
    }
};

// Obtener horarios
const getShedule = async (req, res) => {
    try {   
        const result = await schedule();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los horarios' });
    }
};

module.exports = {
    putShedule,
    getShedule,
};
