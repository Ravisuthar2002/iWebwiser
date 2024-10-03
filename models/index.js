const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const Contant = require('./Content');

const Navbar = require('./Navbar');
const HeaderContent = require('./HeaderContent');
const Footer = require('./Footer');

// Page.destroy({ truncate: true, cascade: true })




module.exports = { Contant, Navbar, HeaderContent, Footer }


db.sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch((err) => console.log('Error: ' + err));

module.exports = db;
