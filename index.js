// Importar express y cors
const express = require('express');
const cors = require('cors');

// Crear la app de express
const app = express();

// Middleware para recibir JSON y evitar problemas de CORS
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Bienvenido al backend de facturación!');
});

// Puerto donde se ejecuta el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

