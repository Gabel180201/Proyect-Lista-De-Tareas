const { Sequelize } = require('sequelize');

const buildSequelize = () => {
  return new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
};

const sequelize = buildSequelize();

const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos PostgreSQL/Supabase conectada exitosamente');

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