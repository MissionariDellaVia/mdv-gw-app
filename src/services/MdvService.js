import axios from 'axios';

const BASE_URL = 'http://www.missionaridellavia.net';

const getInfoByDate = async (date) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + '/api/v1/info/' + date)
            .then((res) => {
                console.log(BASE_URL + '/api/v1/info/' + date)
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    });
};

const loadGospelWay = async (date) => {
    console.log("load gospel -> " + `${process.env.VUE_APP_MDV_BASE_URL}/api/v1/gospel/${date}`);

    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + '/api/v1/gospel/' + date)
            .then((res) => {
                console.log(BASE_URL + '/api/v1/gospel/' + date)
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            });
    });
};

export { getInfoByDate, loadGospelWay }
