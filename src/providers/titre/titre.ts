import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Storage } from '@ionic/storage';


@Injectable()
export class TitreService {
  

  constructor(public api: Api, public storage: Storage) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  getTitre() {
    let seq = this.api.get('achats_/getforme').share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
        console.log(res)
      if (res.status == 'success') {
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  nombre_titre_acheter(titreModel) {
    let seq = this.api.get('achats_/nombre_titre_acheter/' + titreModel).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
        console.log(res)
      if (res.status == 'success') {
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  getMyBalance(id) {
    let seq = this.api.get('binance/'+id).share();
    
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
        console.log(res)
      if (res.status == 'success') {
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }


  
  findAllTitres() {
    let seq = this.api.get('titres').share();
    
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
        console.log(res)
      if (res.status == 'success') {
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  addTitre(titre: Titre) {
    let seq = this.api.post('achats',titre).share();
    
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  
}
