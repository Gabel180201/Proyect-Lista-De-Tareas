const { Sequelize } = require('sequelize');

const buildSequelize = () => {
  const baseOptions = {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
      },
    },
  };

  // Cuando el SQL Server no usa un puerto fijo, lo más común es que sea una instancia
  // nombrada (SQLEXPRESS, SQLEXPRESS01, etc.). En ese caso se resuelve por instancia.
  // Si se especifica DB_PORT (puerto fijo), lo priorizamos.
  // Si no hay puerto fijo, usamos DB_INSTANCE (instancia nombrada).
  if (process.env.DB_PORT) {
    baseOptions.port = Number(process.env.DB_PORT);
  } else if (process.env.DB_INSTANCE) {
    baseOptions.dialectOptions.options.instanceName = process.env.DB_INSTANCE;
  }

  return new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, baseOptions);
};

const sequelize = buildSequelize();

const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos SQL Server conectada exitosamente');

    // En SQL Server, alter:true puede generar SQL inválido con ENUM/CHECK.
    // Solo alteramos si se solicita explícitamente por variable de entorno.
    const useAlter = process.env.DB_SYNC_ALTER === 'true';
    await sequelize.sync(useAlter ? { alter: true } : undefined);

    console.log('✅ Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:');
    console.error(error);
    process.exit(1);
  }
};

module.exports = { sequelize, conectarDB };