import axios from 'axios';
export const fetchProperties = (params: any) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `https://api.pulppo.com/listings/search`,
            params,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            return resolve(response.data);
        })
        .catch((err) => {
            return reject({
                message: err.message,
                status: 500
            });
        })
    })
}