const dbConfig = require("../config/db.config.js");
const pg = require('pg')

const Sequelize = require("sequelize");
const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    dialectModule: require('pg'),

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.client = client;

// MODELS
db.users = require("./user.model.js")(client, Sequelize);
db.todos = require("./todo.model.js")(client, Sequelize);

// ASSOCIATIONS
// USER-TODO
db.users.hasMany(db.todos, { foreignKey: 'userId', onDelete: 'CASCADE' });



module.exports = db;