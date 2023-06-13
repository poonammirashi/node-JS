const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const order= sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  },
})

module.exports = order;