import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'daohamadou@gmail.com',
    password: '123456'
  };
  on_register = false;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  doLogin(form: NgForm) {
    this.account = form.value;
    // this.account.email="daohamadou@gmail.com";
    // this.account.password='123456'
    this.on_register = true;
    this.user.login(this.account).subscribe((resp) => {
      this.on_register = false;
      this.navCtrl.push(MainPage);
      localStorage.removeItem("redirection")
    }, (err) => {
      this.on_register = false;
      // this.navCtrl.push(MainPage);
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
