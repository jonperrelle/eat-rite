'use strict';

const Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        barcode: {
            type: Sequelize.STRING
        }
    });
};
