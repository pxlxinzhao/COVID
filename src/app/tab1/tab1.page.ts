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

  constructor(private dataService: DataService) {
    this.$ = (_) => document.querySelector(_);
  }

  ionViewWillEnter() {
    this.dataService.log();
    this.showNumber(4786, '.confirmed');
    this.showNumber(1, '.deaths');
    this.showNumber(123, '.recovered');
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
