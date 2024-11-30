const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ChallengeAndImpact = sequelize.define('ChallengeAndImpact', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    heading: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    featuredMedia: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    sub_content: {
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
    index: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = ChallengeAndImpact;
