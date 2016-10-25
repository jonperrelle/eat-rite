'use strict';

const Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('food', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        aversion: {
            type: Sequelize.ENUM('Allergy', 'Diet', 'Dislike')
        }
    });
};