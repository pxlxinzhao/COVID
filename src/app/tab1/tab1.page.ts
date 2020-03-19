import { Component } from '@angular/core';
import { Flip } from 'number-flip';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  $: any;
  duration = 2;
  countries = [];
  selectCountry = 'World';

  constructor(private dataService: DataService) {
    this.$ = (_) => document.querySelector(_);
  }

  ionViewWillEnter() {
    this.dataService.get('Canada', (covid19Stats) => {
        console.log(covid19Stats);

        const countrySet = new Set();
        const result = covid19Stats.reduce(( a, b ) => {
          a.confirmed += b.confirmed;
          a.deaths += b.deaths;
          a.recovered += b.recovered;
          countrySet.add(b.country);
          return a;
        }, {
          confirmed: 0,
          deaths: 0,
          recovered: 0
        });

        this.showNumber(result.confirmed, '.confirmed');
        this.showNumber(result.deaths, '.deaths');
        this.showNumber(result.recovered, '.recovered');

        console.log('countrySet', countrySet);
        countrySet.forEach((c) => {
          this.countries.push(c);
        });
    });
  }

  refresh() {
    console.log('selectCountry, selectCountry');
  }

  showNumber(count, selector) {
    const flip = new Flip({
      node: this.$(selector),
      from: this.topUpNumber(count),
      duration: this.duration
    });

    flip.flipTo({
      to: count,
      direct: false
    });
  }

  topUpNumber(i: number) {
    let size = i.toString().length;
    let topNumber = '';

    while ( size > 0 ) {
      topNumber += '9';
      size--;
    }

    return +topNumber;
  }
}
