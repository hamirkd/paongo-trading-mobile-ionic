import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ProfilCreateAutrePage } from './profil-create-autre';

@NgModule({
  declarations: [
    ProfilCreateAutrePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilCreateAutrePage),
    TranslateModule.forChild()
  ],
  exports: [
    ProfilCreateAutrePage
  ]
})
export class ProfilCreateAutrePageModule { }
