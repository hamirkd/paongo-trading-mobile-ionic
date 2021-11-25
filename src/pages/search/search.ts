import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

import { Item } from '../../models/item';
import { Items } from '../../providers';
import { LigdiCashService } from '../../providers/ligdicash/ligdicash';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  onregister=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,
    private ligdicash:LigdiCashService, private iab: InAppBrowser,
    public toastCtrl: ToastController, public modalCtrl: ModalController
    ) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  
  openUrl(cash_data){
    this.onregister=true;
    let options : InAppBrowserOptions = {
      fullscreen:'yes',
      hidenavigationbuttons:'no',
      hideurlbar:'yes',
      zoom:'yes',
      location:'no'
    }
    console.log(cash_data)
    this.ligdicash.buyCryptoMoney(cash_data).subscribe(data=>{
      const d = JSON.parse(JSON.stringify(data)) as {message,status,url_pay};
      
      if(d.status==200){
        this.toastCtrl.create({
          message: d.message,
          duration: 3000,
          position: 'top'
        }).present();
        setTimeout(() => {
          this.iab.create(d.url_pay,"_self",options);
          
        }, 3000);
      }
      else {
        this.toastCtrl.create({
          message: d.message,
          duration: 3000,
          position: 'top'
        }).present().then(e=>{
          this.onregister = false;});
      }
    },err=>{
      this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        position: 'top'
      }).present();
    })
    
    // const browser = this.iab.create('https://ionicframework.com/',"_self",options);
    // browser.close();
  }
  buyCash(){
    
      let addModal = this.modalCtrl.create('BuyCashPage');
      addModal.onDidDismiss(item => {
        if (item) {
          
          this.openUrl(item);
          this.items.add(item);
        }
      })
      addModal.present();
    }
}
