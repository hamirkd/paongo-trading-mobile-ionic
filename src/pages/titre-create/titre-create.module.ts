import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TitreCreatePage } from './titre-create';

@NgModule({
  declarations: [
    TitreCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TitreCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    TitreCreatePage
  ]
})
export class TitreCreatePageModule { }
