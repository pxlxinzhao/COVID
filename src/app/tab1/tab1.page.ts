import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Flip } from 'number-flip';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  $: any;
  duration = 1.2;
  countries = [];
  selectedCountry = 'World';
  cachedCovid19Stats: any;
  isLoading = true;
  loader: any;

  constructor(private storage: Storage, private loadingController: LoadingController, private dataService: DataService) {
    this.$ = (_) => document.querySelector(_);
  }

  async ionViewWillEnter() {
    this.loader = await this.loadingController.create({
      message: 'Retrieving data...',
    });
    await this.loader.present();

    this.refresh( () => {
      this.populateCountries();
      this.storage.get('country').then((val) => {
        if (val) {
          this.selectedCountry = val;
        }
        this.refresh(this.updateLabels.bind(this));
      });
    });
  }

  onCountryChange() {
    console.log('setting country', this.selectedCountry);
    this.storage.set('country', this.selectedCountry);
    this.refresh(this.updateLabels.bind(this));
  }

  refresh(callback?) {
    this.dataService.get(this.selectedCountry, (covid19Stats) => {
      console.log(covid19Stats);
      this.cachedCovid19Stats = covid19Stats;

      if (callback) {
        callback();
      }
  });
  }

  updateLabels() {
    const result = this.cachedCovid19Stats.reduce(( a, b ) => {
      a.confirmed += b.confirmed;
      a.deaths += b.deaths;
      a.recovered += b.recovered;
      return a;
    }, {
      confirmed: 0,
      deaths: 0,
      recovered: 0
    });

    this.showNumber(result.confirmed, '.confirmed');
    this.showNumber(result.deaths, '.deaths');
    this.showNumber(result.recovered, '.recovered');
    this.loader.dismiss();
    this.isLoading = false;
  }

  populateCountries() {
    this.countries = [];
    const countrySet = new Set();
    this.cachedCovid19Stats.forEach(( a ) => {
      countrySet.add(a.country);
      return a;
    });
    countrySet.forEach((c) => {
      this.countries.push(c);
    });
    this.countries.sort();
  }

  showNumber(count, selector) {
    this.$(selector).textContent = '';
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
