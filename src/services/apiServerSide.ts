import axios from 'axios';

const setupApiClient = (ctx = undefined) => {

  const api = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com/'
  });

  return api;
};

export { setupApiClient };
