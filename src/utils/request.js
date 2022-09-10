import axios from "axios";

const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});

requests.interceptors.request.use(config => {
    let token = localStorage.getItem('TOKEN');
    if (token) {
        config.headers.token = token;
    }
    return config;
});

export default requests;