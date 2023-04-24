const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('cinema', 'postgres', 'Daniyalou2002', {
  host: 'localhost',
  dialect: 'postgres',
});

const Orders = sequelize.define(
  'orders',
  {
    sessionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Sessions',
        key: 'id',
      },
    },
    customer_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    customer_phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    seats: {
      type: Sequelize.INTEGER,
    },
    total_price: {
      type: Sequelize.FLOAT(5, 2),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Orders;
