const Sequelize = require('model/mongodb/sequelize')

const {mysql} = require('../../config')

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    dialectOptions: {
        charset: "utf8mb4",
        // collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    define: {
        'underscored': true,
        'charset': 'utf8mb4'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
})

module.exports = sequelize
