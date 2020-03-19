import { Component } from '@angular/core';
import { Flip } from 'number-flip';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  $: any;

  constructor() {
    this.$ = (_) => document.querySelector(_);
  }

  ionViewWillEnter() {
    this.showConfirmed();
  }

  showConfirmed() {
    const count = 4789;
    const flip = new Flip({
      node: this.$('.confirmed'),
      from: this.topUpNumber(count),
      duration: 2
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
