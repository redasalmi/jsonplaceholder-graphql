const { fetchData, fetchById } = require('../utils/fetch');

const fetchUsers = () => fetchData('users');
const fetchUser = (id) => fetchById('users', id);

module.exports = { fetchUsers, fetchUser };
