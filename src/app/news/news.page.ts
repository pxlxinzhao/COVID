import { Component, ElementRef, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  styleUrls: ['news.page.scss']
})
export class NewsPage {
  loading = false;
  loader: any;
  articles: Array<any>;
  page = 1;
  networkError = false;

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
      const res = await this.getNews();

      if (res) {
        console.log('res', res);
        this.articles = res.data.articles;
        console.log(this.articles);
      }

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
      const res = await this.getNews();

      if (res) {
        this.articles = this.articles.concat(res.data.articles);
      }

      event.target.complete();
  }

  private async getNews() {
    this.networkError = false;
    try {
      return await this.newsService.get(this.page++);
    } catch (e) {
      console.error(e);
      this.networkError = true;
    }
  }
}
