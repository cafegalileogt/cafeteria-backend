// Buscar un producto por ID
exports.findProductById = (id, callback) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // solo un producto
  });
};
// Buscar un producto por ID
exports.findProductById = (id, callback) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]); // solo un producto
  });
};
