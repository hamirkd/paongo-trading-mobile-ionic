import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Items } from '../../providers';
import { TitreService } from '../../providers/titre/titre';

@IonicPage()
@Component({
  selector: 'page-list-titre',
  templateUrl: 'list-titre.html'
})
export class ListTitrePage implements OnInit{
  cardItems;
  liste:{titre,data}[]=[];
  titreModels:{nom,id}[];
  selectTitre:any;
  valeur_titre_achete:any;
  dividante_titre_achete:any;
  nombre_titre_achete:any;
  montant_titre_achete:any;
  limit_titre_achete:any;

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,private titreService:TitreService) {
    

  }
ngOnInit(){
  if(localStorage.getItem('titreModels')){
    this.titreModels = JSON.parse(localStorage.getItem('titreModels'));
  }
  this.titreService.findAllTitres().subscribe(d => {
    this.titreModels = JSON.parse(JSON.stringify(d));
    localStorage.setItem("titreModels",JSON.stringify(d))
})
}
  getListe(){
    this.titreService.getTitre().subscribe(data=>{
            let titres_ = Object.keys(data).map(function (personNamedIndex) {
                let items = data[personNamedIndex];
                return items;
            })

            this.liste = [];
            for (let data of titres_) {
                this.addOrCreate({ titre: data.titre, data: data });
            }
    },err=>{console.log(err)})
  }
  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.getListe();
  }
  

  
  addOrCreate(data) {
    const index = this.liste.findIndex(l => l.titre == data.titre);

    if (index != -1) {
        this.liste[index].data.push(data.data);
        // for (let titre of this.liste[index].data) {
        //     titre.dividante_titre_achete = this.dividante_titre_achete;
        //     titre.valeur_titre_achete = this.valeur_titre_achete;
        // }
    }
    else {
        this.liste.push({ titre: data.titre, data: [data.data] });

        this.getBinanceAccount(data.data);

    }
    console.log(this.liste)
}

getBinanceAccount(titre) {
  console.log(titre.emailadresse != 'daohamadou@gmail.com', titre.emailadresse)
  if (titre.emailadresse && titre.emailadresse != 'daohamadou@gmail.com')
      if (titre.etat_paiement.toLocaleLowerCase() == 'non_paye') {
          // this.toastrService.warning("Vous devez payé ce titre");
          return;
      }
      
  const titreModel = this.titreModels.find(t => t.nom == titre.titre); console.log("ici")

  this.titreService.getMyBalance(titreModel.id).subscribe(data2 => {
    let data = JSON.parse(JSON.stringify(data2)) as {balance:number,balance_usd:number};
      this.selectTitre = { titre: titre.titre, balance: data && data.balance ? data.balance : 0, balance_usd: data && data.balance_usd ? data.balance_usd : 0 };
      this.valeur_titre_achete = this.selectTitre.balance_usd / this.nombre_titre_achete + 250;
      this.dividante_titre_achete = (this.selectTitre.balance_usd - this.nombre_titre_achete * this.montant_titre_achete) / (2 * this.nombre_titre_achete)
      const index = this.liste.findIndex(l => l.titre == titre.titre);
      console.log("ici===>", index, this.dividante_titre_achete)

      if (index != -1) {
          // this.liste[index].dividante_titre_achete=this.dividante_titre_achete;
          for (let titre of this.liste[index].data) {
              titre.dividante_titre_achete = this.dividante_titre_achete;
              titre.valeur_titre_achete = this.valeur_titre_achete;
          }
          console.log(this.liste)
          // this.forceUpdate();
      }
  },err => {

      this.selectTitre = { titre: titre.titre, balance: 0, balance_usd: 0 };
      this.valeur_titre_achete = 0;

  });
  this.titreService.nombre_titre_acheter(titre.titre).subscribe(data => {

      let data2 = JSON.parse(JSON.stringify(data)) as {nombre:number,montant:number,limit:number};
      this.nombre_titre_achete = data2.nombre;
      this.montant_titre_achete = data2.montant;
      this.limit_titre_achete = data2.limit;
      console.log(data)

  },err => {
      this.nombre_titre_achete = 0;
      this.valeur_titre_achete = 0;
      this.dividante_titre_achete = 0;
      this.montant_titre_achete = 0;
      this.limit_titre_achete = 0;
  })
}
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('TitreCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  refresh(event) {
    this.getListe();
    setTimeout(() => {
      if (event)
          event.complete();
    }, 3000);
    
  }
}
