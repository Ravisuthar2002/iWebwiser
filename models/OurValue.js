const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// allowNull :  true (field not exists and without value that time insert data)
// allowNull : false (field is requer with value that time inert data)
const OurValues = sequelize.define('OurValues', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    heading: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
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
    ourValueLists: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    cardWith: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    containerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reletive: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    page: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true
});

module.exports = OurValues;
