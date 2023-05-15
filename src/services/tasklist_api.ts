import axios, { AxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

const tasklist_api = axios.create({
    baseURL: 'https://dev.info-rmi.com/itaskhorse/ISAPI.dll'
    //baseURL: 'http://192.168.15.21:8080'
})


tasklist_api.interceptors.request.use(

    (tasklist_api: AxiosRequestConfig) => {

        // Do something before request is sent
        const { 'tasklist.token': token } = parseCookies();

        if (token) {
            tasklist_api.headers = {
                ...tasklist_api.headers,
                Authorization: `Bearer ${token}`,
            };
            tasklist_api.auth
        }

        return tasklist_api;
    },

    error => {
        Promise.reject(error);
    }
)

tasklist_api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default tasklist_api