import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}api/v1`,
    // withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Origin': `${process.env.VUE_APP_API_URL}`,
    //     'Access-Control-Allow-Credentials': 'true',
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // },
});

export default instance
