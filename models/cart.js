const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncreament:true
  }
})

module.exports = Cart;