const db = require('../config/db');

const fetchData = (property) => db.get(property).value();
const fetchById = (property, id) => db.get(property).find({ id }).value();

module.exports = { fetchData, fetchById };
