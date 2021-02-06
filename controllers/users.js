const fetchData = require('../utils/fetch');

const fetchUsers = async () => fetchData('/users');
const fetchUser = async (id) => fetchData(`/users/${id}`);

module.exports = { fetchUsers, fetchUser };
