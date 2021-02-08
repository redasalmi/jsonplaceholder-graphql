const db = require('../config/db');

const fakeData = require('./fakeData');
db.defaults(fakeData).write();
