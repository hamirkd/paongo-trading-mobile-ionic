import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListTitrePage } from './list-titre';

@NgModule({
  declarations: [
    ListTitrePage,
  ],
  imports: [
    IonicPageModule.forChild(ListTitrePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListTitrePage
  ]
})
export class ListTitrePageModule { }
