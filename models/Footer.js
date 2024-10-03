const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Footer = sequelize.define('Footer', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    footerlinks: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    socialMedia: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    logos: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    branches: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    page: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true
});


module.exports = Footer;

