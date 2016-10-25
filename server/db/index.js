'use strict';

const db = require('./_db');
module.exports = db;

require('./models/user')(db);
require('./models/food')(db);
require('./models/product')(db);


const User = db.model('user');
const Food = db.model('food');
const Product = db.model('product');

User.belongsToMany(Food, {through : 'user_food'});
Food.belongsToMany(User, {through : 'user_food'});
User.belongsToMany(Product, {through : 'user_product'});
Product.belongsToMany(User, {through : 'user_product'});
Product.belongsToMany(Food, {through : 'product_food'});
Food.belongsToMany(Product, {through : 'product_food'});
