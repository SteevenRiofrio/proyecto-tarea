const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const tareasRoutes = require('./routes/tareas');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tareas', tareasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Tareas funcionando correctamente' });
});

// Iniciar servidor
async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
    
    await sequelize.sync();
    console.log('✅ Tablas sincronizadas');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

iniciarServidor();