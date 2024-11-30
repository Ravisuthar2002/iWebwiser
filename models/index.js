const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Contant = require('./Content');
db.Navbar = require('./Navbar');
db.Navbarlink = require('./Navbarlinks');
db.HeaderContent = require('./HeaderContent');
db.Footer = require('./Footer');

// db.Navbarlink.hasMany(db.Navbar, {
//     foreignKey: 'linkId', 
//     as: 'navbars'         
//   });
  
//   db.Navbar.belongsTo(db.Navbarlink, {
//     foreignKey: 'linkId',
//     as: 'navbarlink'     
//   });

db.Navbar.hasMany(db.Navbarlink, {  foreignKey: 'navbarId' });
db.Navbarlink.belongsTo(db.Navbar, { foreignKey: 'navbarId'});


db.sequelize.sync({ force: false })
.then(() => console.log('Database synced'))
.catch((err) => console.log('Error: ' + err));

module.exports = db;
