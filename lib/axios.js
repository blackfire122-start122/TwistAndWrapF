import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost/api',
    withCredentials: true
});
export default client;
