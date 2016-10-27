'use strict';

const Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('food', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        aversion: {
            type: Sequelize.ENUM('Allergy', 'Diet', 'Dislike')
        }
    });
};