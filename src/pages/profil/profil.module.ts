import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilPage } from './profil';

@NgModule({
  declarations: [
    ProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilPage),
    TranslateModule.forChild()
  ],
  exports: [
    ProfilPage
  ]
})
export class ProfilPageModule { }
