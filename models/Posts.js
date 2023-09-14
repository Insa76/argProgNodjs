const { DataTypes, sequelize } = require("../database");

const PostSchema = sequelize.define(
  "Posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
    timestamps: false,
  }
);

module.exports = PostSchema;
