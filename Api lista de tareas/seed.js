require('dotenv').config();
const { sequelize, conectarDB } = require('./config/db');
const Recordatorio = require('./models/Recordatorio');
const datosEjemplo = require('./datos_ejemplo.json');

const cargarDatos = async () => {
  try {
    // Conectar a BD
    await conectarDB();
    console.log('✅ Conectado a SQL Server');

    // Limpiar datos anteriores
    await Recordatorio.destroy({ where: {} });
    console.log('🗑️  Recordatorios anteriores eliminados');

    // Insertar datos de ejemplo
    const recordatoriosInsertados = await Recordatorio.bulkCreate(
      datosEjemplo.recordatorios
    );
    console.log(`✅ ${recordatoriosInsertados.length} recordatorios insertados`);

    console.log('\n📋 Datos insertados:');
    recordatoriosInsertados.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec.texto} (${rec.prioridad})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

cargarDatos();
