const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Navbar = sequelize.define('Navbar', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    page: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    href: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    links: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [] 
    },
}, {
    timestamps: true, 
    paranoid: true 
});

module.exports = Navbar;
