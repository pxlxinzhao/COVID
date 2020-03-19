import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor() { }

  log() {
      console.log('here');
  }
}
