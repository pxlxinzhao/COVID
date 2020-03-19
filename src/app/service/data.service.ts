import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor() { }

    get(country, callback) {
        axios.get(' https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats',
            {
                params: {country: country || ''},
                headers: {
                    'X-RapidAPI-Key': 'ea6c925bd6msh4e3675a86f5ac10p115dc6jsnb64df8a0a578',
                    'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
                }
            }
        ).then((res) => {
            if (callback && typeof callback === 'function') {
                callback(res.data.data.covid19Stats);
            }
        });
    }
}
