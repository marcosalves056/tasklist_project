import axios, { AxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

const main_api = axios.create({
    /* Comment for production */
    //baseURL: 'https://dev.info-rmi.com/mainapi/ISAPI.dll'
    /* Uncomment for production */
    baseURL: 'https://tools.info-rmi.com/mainapi/ISAPI.dll'
})


main_api.interceptors.request.use(

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

main_api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default main_api