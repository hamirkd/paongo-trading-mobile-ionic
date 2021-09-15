import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilCreateEditPage } from './profil-create-edit';

@NgModule({
  declarations: [
    ProfilCreateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilCreateEditPage),
    TranslateModule.forChild()
  ],
  exports: [
    ProfilCreateEditPage
  ]
})
export class ProfilCreateEditPageModule { }
