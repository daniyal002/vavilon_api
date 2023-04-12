const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("cinema", "postgres", "daniyalou", {
  host: "localhost",
  dialect: "postgres",
});

const Sessions = sequelize.define(
  "sessions",
  {
    movieId: {
      type: Sequelize.INTEGER,
      references: {
        model: "movies",
        key: "id",
      },
    },
    time: {
      type: Sequelize.TIME,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    price: {
      type: Sequelize.NUMERIC(5, 2),
    },
    remaining_seats: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Sessions;
