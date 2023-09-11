import axios from 'axios';

axios.defaults.withCredentials = true;//跨域请求时转发cookie

const baseURL = process.env.NODE_ENV === 'production' ? 'http://192.168.125.159:4000' : 'http://localhost:4000';
const instance = axios.create({
    baseURL: baseURL,
    timeout: 3000,
});

export default instance;