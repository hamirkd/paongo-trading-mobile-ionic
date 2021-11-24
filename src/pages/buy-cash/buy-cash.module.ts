import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { BuyCashPage } from './buy-cash';

@NgModule({
  declarations: [
    BuyCashPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyCashPage),
    TranslateModule.forChild()
  ],
  exports: [
    BuyCashPage
  ]
})
export class BuyCashPageModule { }
