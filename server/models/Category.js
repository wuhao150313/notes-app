const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Note = require("./Note");

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// 建立与Note的一对多关系
Category.hasMany(Note, {
  foreignKey: "categoryId",
  as: "notes",
});
Note.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = Category;
