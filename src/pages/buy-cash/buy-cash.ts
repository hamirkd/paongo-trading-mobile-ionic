import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera } from "@ionic-native/camera";
import {
  IonicPage,
  NavController,
  ToastController,
  ViewController,
} from "ionic-angular";



@IonicPage()
@Component({
  selector: "page-buy-cash",
  templateUrl: "buy-cash.html",
})
export class BuyCashPage {
  @ViewChild("fileInput") fileInput;

  isReadyToSave: boolean;

  form: FormGroup;
  on_register = false;
  cash_data : {amount,usdt_address} = {amount:0,usdt_address:''}

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera
  ) {
    this.form = formBuilder.group({
      profilePic: [""],
      name: ["", Validators.required],
      about: [""],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {}

  ngOnInit(): void {
 
  }


  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the titre, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) {
      return;
    }
    this.viewCtrl.dismiss(this.form.value);
  }

  buyCash() {
    this.on_register = true;
    let toast = this.toastCtrl.create({
      message: "Protocole de paiement en cours",
      duration: 3000,
      position: "top",
    });
    toast.present();
    this.viewCtrl.dismiss(this.cash_data);
  }
}
