import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { Settings, User as UserService } from '../../providers';
import { App } from 'ionic-angular';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';


/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html'
})
export class ProfilPage implements OnInit{
  // Our local profil object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = ProfilPage;
  user:User=new User();

  ngOnInit() {
    this.userService.findUserById().subscribe(data=>{
      this.user = JSON.parse(JSON.stringify(data)) as User;
      console.log(this.user)
    },err=>{
      //message d'erreur
      console.log(err);
    });
  }
  constructor(
    public toastCtrl: ToastController, public storage: Storage, public modalCtrl: ModalController, public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,private userService:UserService,
    public appCtrl: App) {
  }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

    switch (this.page) {
      case 'main':
        break;
        case 'profile':
          group = {
            option4: [this.options.option4]
          };
          break;
    }
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  showMessage(message, duration = 3000) {

    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',

    });
    toast.present();
  }
  
  refresh(event) {
    this.userService.findUserById().subscribe(data=>{
      this.user = JSON.parse(JSON.stringify(data)) as User;
      if (event)
          event.complete();
    },err=>{
      if (event)
          event.complete();
      this.showMessage(JSON.stringify(err));
    });
    setTimeout(() => {
      if (event)
          event.complete();
    }, 3000);
  }

  onSelectChange(event){
    
    this.translate.use(event);
    this.storage.set("user", JSON.stringify(event));
  }
  profil_create() {
    // this.navCtrl.push('ProfilCreateEditPage',{data:this.user});
    
    let addModal = this.modalCtrl.create('ProfilCreateEditPage',{data:this.user});
    addModal.onDidDismiss(item => {
      this.ngOnInit();
    })
    addModal.present();
  }

  profil_create_autre() {
    
    let addModal = this.modalCtrl.create('ProfilCreateAutrePage',{data:this.user});
    addModal.onDidDismiss(item => {
      this.ngOnInit();
    })
    addModal.present();
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
  logout(){
    this.userService.logout();
    this.appCtrl.getRootNav().push('WelcomePage');
  }
}
