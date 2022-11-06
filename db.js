const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telega__bot',
    'root',
    'root',
    {
        host: '5.188.128.44',
        port: '6432',
        dialect: 'postgres'
    }
)