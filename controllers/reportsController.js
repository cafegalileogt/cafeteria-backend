require("dotenv").config();

const { findOrdersByDatesModel, findPeakHoursModel, findSalesByDatesModel, obtenerTopTenProducts } = require("../models/reportsModel");

// OBTENER ORDENES POR RANGO DE FECHAS
const getAllOrdersByDates = async (req, res) => {

  try {

    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "'from' y 'to' son obligatorios" });
    }

    const result = await findOrdersByDatesModel(from, to);
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No hay Ordenes" });
    }

    return res.status(200).json({
      from,
      to,
      orders: result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al obtener las ordenes",
    });
  }
};


// OBTENER HORA PICO DE ORDENES
const getPeakHours = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ error: "'from' y 'to' son obligatorios" });

    const result = await findPeakHoursModel(from, to);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No hay horas pico" });
    }

    return res.status(200).json({
      from,
      to,
      horas_pico: result,
      most_active_hour: result?.[0]['hour']
    });

  } catch (error) {

    return res.status(500).json({ success: false, error: "Error al obtener las horas pico"});
  }
};


// OBTENER VENTAS POR RANGO DE FECHAS
const getAllSalesByDates = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "'from' y 'to' son obligatorios" });
    }


    const result = await findSalesByDatesModel(from, to);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No hay Ventas" });
    }

    // Sumar totales y redondear a 2 decimales
    const total_sales = result
      .reduce((acc, item) => acc + parseFloat(item.total), 0)
      .toFixed(2); // ya es string con 2 decimales

    // Formatear resultados diarios con fecha YYYY-MM-DD
    const daily_sales = result.map((item) => ({
      date: new Date(item.date).toISOString().slice(0, 10),
      orders: item.orders,
      total: item.total.toFixed
        ? item.total.toFixed(2) // si item.total ya es un número
        : parseFloat(item.total).toFixed(2), // si viene como string
    }));

    return res.status(200).json({
      from,
      to,
      total_sales,
      daily_sales,
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al obtener las ventas",
    });
  }
};


// para Obtener Top 10 productos mas vendidos en un rango de fechas
const getTopTenProductsByDates = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ error: "'from' y 'to' son obligatorios" });
    }

    const top_products = await obtenerTopTenProducts(from, to);

    if (!top_products || top_products.length === 0) {
      return res.status(404).json({ message: "No productos Vendidos" });
    }

    return res.status(200).json({
      from,
      to,
      top_products
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al obtener los productos vendidos",
    });
  }
};



module.exports = {
  getAllOrdersByDates,
  getPeakHours,
  getAllSalesByDates,
  getTopTenProductsByDates
};
