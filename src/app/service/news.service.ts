import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class NewsService {

    constructor() { }

    async get() {
        return await axios.get(`https://newsapi.org/v2/everything?q=COVID-19&sortBy=publishedAt&apiKey=88911895adf74fc58d23364b9a7b35d1`);
    }
}
