import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from '../service/news.service';
import { LoadingController, AngularDelegate } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loading = false;
  loader: any;
  articles: Array<any>;
  page = 1;

  @ViewChild(IonInfiniteScroll, null) infiniteScroll: IonInfiniteScroll;

  constructor(private newsService: NewsService,
              private loadingController: LoadingController,
              private iab: InAppBrowser,
              private eRef: ElementRef
              ) {}

  async ionViewWillEnter() {
    if (!this.articles) {
      this.loading = true;
      this.loader = await this.loadingController.create({
        message: 'Loading news...',
      });
      await this.loader.present();
      console.log(`loading page ${this.page}`);
      const res = await this.newsService.get(this.page++);
      console.log('res', res);
      this.articles = res.data.articles;
      console.log(this.articles);
      this.loader.dismiss();
      this.loading = false;
    }
  }

  open(link: string) {
    this.iab.create(this.convertHttps(link));
  }

  getImageUrl(article: any) {
    return this.convertHttps(article.urlToImage);
  }

  convertHttps(str: string) {
    if (str) {
      return str.replace('http://', 'https://');
    } else {
      return str;
    }
  }

  async loadData(event) {
      console.log(`loading page ${this.page}`);
      const res = await this.newsService.get(this.page++);
      this.articles = this.articles.concat(res.data.articles);
      event.target.complete();
  }
}
