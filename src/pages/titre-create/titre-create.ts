import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ToastController, ViewController } from 'ionic-angular';
import { TitreModel } from '../../models/titre.model2';
import { User } from '../../models/user';
import { User as UserService } from '../../providers';
import { TitreService } from '../../providers/titre/titre';
const FRAIS_ACHAT = 250;
class Titre {
  id: string;
  nomprenom: string;
  telephone: string;
  emailadresse: string;
  titre_id:number;
  titre: string;
  montant: string;
  moyenpaiement: string;
  adressepaiement: string;
  montantcrypto: string;
  montantcrypto_recu: string;
  transaction_code: string;
  transaction_hash: string;
  etat_paiement: string;
  date_paiement: string;
  etat_investissement: string;
  supprimer: string;
  created_at: string;
  updated_at: string;
}
@IonicPage()
@Component({
  selector: 'page-titre-create',
  templateUrl: 'titre-create.html'
})
export class TitreCreatePage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;
  _TITRE:TitreModel[]=[];

  titre: Titre  = new Titre();
  choix_titre:TitreModel;
  form: FormGroup;
  on_register=false;

  constructor(
    public toastCtrl: ToastController,private titreService:TitreService,private user:UserService,public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  ngOnInit(): void {
    this.user.findUserById().subscribe(data => {
      const user = JSON.parse(JSON.stringify(data)) as User;
      this.titre  = new Titre();
      console.log(this.titre)
      this.titre.nomprenom = user.last_name + " " + user.first_name;
      this.titre.telephone = user.telephone;
      this.titre.emailadresse = user.email;
    })
    this.titreService.findAllTitres().subscribe(d=>{
      this._TITRE = JSON.parse(JSON.stringify(d)) as TitreModel[];
      this._TITRE = this._TITRE.filter(s=>!s.bloquer)
    })
  }
  
  choix_titre_(titre: TitreModel) {
    this.choix_titre = titre;
    this.on_register = true;
    this.nombre_titre_achete = 0;
    this.valeur_titre_achete = 0;
    this.limit_titre_achete = 0;
    this.titreService.nombre_titre_acheter(titre.nom).subscribe(data => {
      
      let data2 = JSON.parse(JSON.stringify(data)) as { nombre, montant, limit }
      this.nombre_titre_achete = data2.nombre as number;
      this.limit_titre_achete = data2.limit as number;

      this.titreService.getMyBalance(titre.id).subscribe(data2 => {
        this.on_register = false;
        let data = JSON.parse(JSON.stringify(data2))
        let selectTitre = { titre: titre.nom, balance: data && data.balance ? data.balance : 0, balance_usd: data && data.balance_usd ? data.balance_usd : 0 };
        this.valeur_titre_achete = selectTitre.balance_usd / this.nombre_titre_achete + FRAIS_ACHAT;
        this.choix_titre.montant = this.valeur_titre_achete;
      }, err => {
        this.on_register = false;
        this.valeur_titre_achete = titre.montant+FRAIS_ACHAT;
        this.choix_titre.montant = this.valeur_titre_achete;
      })

    }, err => {
      this.on_register = false;
      this.nombre_titre_achete = titre.montant+FRAIS_ACHAT;
      this.valeur_titre_achete = this.valeur_titre_achete;
      this.limit_titre_achete = 0;
    })
  }
  nombre_titre_achete = 0;
  valeur_titre_achete = 0;
  limit_titre_achete = 0;


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
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
  
  registertitre() {
    if (!this.choix_titre) {
      
      let toast = this.toastCtrl.create({
        message: "Veuillez choisir un titre",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      // this.toasterService.warning("Veuillez choisir un titre");
      return;
    }
    this.titre.titre = this.choix_titre.nom;
    this.titre.titre_id=this.choix_titre.id;
    this.titre.montant=this.choix_titre.montant?this.choix_titre.montant.toFixed(1):0+'';
    this.on_register = true;
    this.titreService.addTitre(this.titre).subscribe(data2 => {
      let data = JSON.parse(JSON.stringify(data2))
      if (data.status == 200) {
        let toast = this.toastCtrl.create({
          message: "Le titre a été ajouté avec succès",
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.viewCtrl.dismiss(null);
      }
      else if(data.status == 400){
        let toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      else{
        
        let toast = this.toastCtrl.create({
          message: "Impossible d'ajouter le titre",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      console.log(data)
      this.on_register = false;
    }, err => { 
      console.log(err)
      if(err.status == 400){
        
        let toast = this.toastCtrl.create({
          message: err.error.message,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      else{ 
        
        let toast = this.toastCtrl.create({
          message: "Impossible d'ajouter le titre",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      this.on_register = false;
    });
  }
}
