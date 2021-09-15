import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { first_name: string, name: string, last_name: string, email: string, telephone: string, password: string, password_confirmation: string } = {
    name: '',
    email: '',
    telephone: '',
    password: '',
    first_name: '',
    last_name: '',
    password_confirmation: ''
  };
  on_register = false;

  // Our translated text strings
  private signupConfirmPasseString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('VEUILLEZCONFIRMERMOTPASSE').subscribe((value) => {
      this.signupConfirmPasseString = value;
    })
  }

  showMessage(message, duration = 3000) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',

    });
    toast.present();
  }

  doSignup() {
    this.on_register = true;
    this.account.name = this.account.last_name + " " + this.account.first_name;
    console.log(this.account)
    if(this.account.password_confirmation!=this.account.password){
      this.showMessage(this.signupConfirmPasseString);
      this.on_register = false;
      return ;
    }
    
    this.user.signup(this.account).subscribe(data2 => {
      // Message de connexion de compte
      let data = JSON.parse(JSON.stringify(data2))
      this.on_register = false;

      switch (data.status) {
        case 400:
          this.showMessage("Veuillez vérifier les informations du compte");

          break;
        case 200:
        case 201:


          this.showMessage("Votre compte a été crée");
          setTimeout(() => {
            this.showMessage("Vous serez rediriger vers la page de connexion");
          }, 2000);
          setTimeout(() => {
            this.navCtrl.push(MainPage);
          }, 5000);
          break;

        default:
          break;
      }

    }, err => {
      this.on_register = false;
      let error = JSON.parse(err.error);
      if (error.telephone)
        this.showMessage(error.telephone)
      else if (error.password)
        this.showMessage(error.password)
      else
        this.showMessage(error)

      // Message de non création de compte
    })
  }
}
