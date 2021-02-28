const db = require('../config/db');

const fetchData = (property) => db.get(property).value();
const fetchById = (property, id) => db.get(property).find({ id }).value();

const getPropertyLength = (property) => db.get(property).value().length;

module.exports = { fetchData, fetchById, getPropertyLength };
