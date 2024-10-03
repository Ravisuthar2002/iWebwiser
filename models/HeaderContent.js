const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HeaderContent = sequelize.define('HeaderContent', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    subtitle: {
        type: DataTypes.STRING,
    },
    navigationMenus: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    logos: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    text: {
        type: DataTypes.TEXT,
    },
    body: {
        type: DataTypes.TEXT,
    },
    label: {
        type: DataTypes.STRING,
    },
    href: {
        type: DataTypes.STRING,
    },
    featuredMedia: {
        type: DataTypes.STRING,
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
    tableName: 'header_contents',
    timestamps: true,
    paranoid: true
});

module.exports = HeaderContent;
