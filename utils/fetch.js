const fetch = require('node-fetch');

const baseUrl = 'https://jsonplaceholder.typicode.com';

const fetchData = async (endpoint) => {
  const url = `${baseUrl}${endpoint}`;
  const resp = await fetch(url);
  const json = await resp.json();

  return json;
};

module.exports = fetchData;
