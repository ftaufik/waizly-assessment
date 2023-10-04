// DATABASE SETUP
module.exports = {
    HOST: "ep-summer-grass-95999114.ap-southeast-1.aws.neon.tech",
    USER: "ftaufik.ros",
    PASSWORD: "e7QB8pmuwrok",
    DB: "todo-app",
    dialect: "postgres",
    dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};