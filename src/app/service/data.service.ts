import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor() { }

    async get(country?) {
        if (country && country !== 'World') {
            return await axios.get(`https://corona.lmao.ninja/countries/${country}`);
        } else {
            return await axios.get('https://corona.lmao.ninja/countries');
        }
    }
}
