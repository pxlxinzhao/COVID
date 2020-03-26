import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
})
export class NewsService {

    constructor() { }

    async get(page) {
        return await axios.get(
            'https://newsapi.org/v2/everything?' +
             'q=COVID-19&sortBy=publishedAt&page=' + page +
             '&language=en&apiKey=88911895adf74fc58d23364b9a7b35d1'
            );
    }
}
