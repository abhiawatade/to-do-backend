const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Todo = createDB.define("todo", {
  id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  dueDate: DataTypes.STRING,
  completed: DataTypes.BOOLEAN,
  priority: DataTypes.INTEGER,
});

module.exports = Todo;
