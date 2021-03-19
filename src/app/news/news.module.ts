import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AltImageDirective } from '../directives/AltImage.directive';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NewsPage } from './news.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: NewsPage }])
  ],
  declarations: [NewsPage, AltImageDirective]
})
export class NewsPageModule {}
