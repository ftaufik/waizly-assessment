module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define("Todo", {
        userId: {
            type: DataTypes.STRING,
        },
        todo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    });

  return Todo;
};