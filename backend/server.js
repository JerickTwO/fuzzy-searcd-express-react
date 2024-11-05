// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Cambia esto por tu usuario de MySQL
    password: '',       // Cambia esto por tu contraseña de MySQL
    database: 'fuzzy_search_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Endpoint para obtener los datos
app.get('/api/items', (req, res) => {
    const searchQuery = req.query.q;

    // Consulta SQL para buscar coincidencias aproximadas
    const sql = `SELECT * FROM items WHERE name LIKE ?`;
    db.query(sql, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
