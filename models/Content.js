const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Content = sequelize.define('Content', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    heading: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
        defaultValue: []
    },
    logos: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    lists: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    navigationMenus: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    containerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    relative: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    page: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "home"
    },
    position: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = Content;
