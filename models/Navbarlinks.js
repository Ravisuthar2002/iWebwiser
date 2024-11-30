const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Navbarlink = sequelize.define('Navbarlink', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  href: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link_list: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  subLinks: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  navbarId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Navbars', 
      key: 'id',
    },
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Navbarlink;
