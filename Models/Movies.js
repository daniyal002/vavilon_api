const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('cinema', 'postgres', 'Daniyalou2002', {
  host: 'localhost',
  dialect: 'postgres',
});

const Movies = sequelize.define(
  'movies',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    poster_url: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.FLOAT,
    },
    age_limit: {
      type: Sequelize.INTEGER,
    },
    trailer_url: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    genre: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Movies;
