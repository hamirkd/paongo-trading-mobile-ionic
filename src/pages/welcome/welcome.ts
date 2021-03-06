import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';
import { Storage } from '@ionic/storage';

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController,private user:User, public storage: Storage) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
  initialiser(){
    localStorage.removeItem("TutoralNoActif");
  }
  
  ionViewDidLoad() {
    this.user.init().then(data=>{
      if(data){this.navCtrl.push(MainPage)}
    })
  }
}
