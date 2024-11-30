const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ConsultanForm = sequelize.define('ConsultanForm', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    paranoid: true
});

module.exports = ConsultanForm;
