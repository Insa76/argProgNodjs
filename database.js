const { Sequelize, DataTypes } = require("sequelize");

// Instancia de conexión a la base de datos
const sequelize = new Sequelize("forodb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
};
