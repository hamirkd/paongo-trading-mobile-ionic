import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { User } from '../../models/user';
import { User as UserService } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profil-create-autre',
  templateUrl: 'profil-create-autre.html'
})
export class ProfilCreateAutrePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;
  user: User = new User()

  constructor(
    public toastCtrl: ToastController, private userService: UserService, public navCtrl: NavController, public viewCtrl: ViewController, private navParams: NavParams, formBuilder: FormBuilder, public camera: Camera) {
    this.form = formBuilder.group({
      profilePic: [''],
      s_first_name: [this.user.s_first_name, Validators.required],
      s_last_name: [this.user.s_last_name, Validators.required],
      s_telephone: [this.user.s_telephone],
      s_postal_code: [this.user.s_postal_code],
      s_town: [this.user.s_town],
      s_country: [this.user.s_country]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    this.user = JSON.parse(JSON.stringify(this.navParams.get("data")));
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */

  showMessage(message, duration = 3000) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',

    });
    toast.present();
  }
  done() {
    if (!this.form.valid) { return; }
    
    this.userService.updateUser(this.user).subscribe(data => {
      // Message de reussite de modification
      this.showMessage("Vos informations ont été enregistrées avec succès");
      console.log(data);
      this.viewCtrl.dismiss(this.form.value);
    }, err => {
      // Message d'impossibilite de modification d'un utilisateur
      this.showMessage("Impossible d'enregistrer vos informations");
      console.log(err);
    })
    
  }
}