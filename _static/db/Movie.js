import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overview: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release_date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  runtime: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  spoken_languages: {
    type: DataTypes.JSON,
    allowNull: false
  },
  backdrop_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster_path: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { timestamps: true });

export default Movie;