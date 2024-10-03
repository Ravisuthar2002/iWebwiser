const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Content = sequelize.define('Content', {
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
        allowNull: true,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    href: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    featuredMedia: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    logos: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: '[]'
    },
    lists: {
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
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = Content;
