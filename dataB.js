const Sequelize = require('sequelize');

const sequelize = new Sequelize('project-1', 'root', 'Nish@nt9' , {
    dialect: 'mysql',
    storage: 'localhost'
});

const Expense = sequelize.define('users', {
    expense: Sequelize.INTEGER,
    description: Sequelize.STRING,
    category: Sequelize.STRING
});

module.exports = {
    sequelize, Expense
};