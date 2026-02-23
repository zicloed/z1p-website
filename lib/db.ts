'use strict';

const dbConfig = {
    host: 'localhost', // database host
    user: 'your_username', // database user
    password: 'your_password', // database password
    database: 'ecommerce_db', // database name
};

const productTable = 'products';
const orderTable = 'orders';

module.exports = { dbConfig, productTable, orderTable };