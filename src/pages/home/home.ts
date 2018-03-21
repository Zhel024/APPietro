import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OggettoProvider } from '../../providers/oggetto/oggetto';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { User } from '../../models/user';
import { FormPage } from '../form/form';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  oggetti: OggettoPrestato[] = [];
  insertedOggetti: OggettoPrestato [];
  users: User[];

  constructor(public navCtrl: NavController,
              private servizioOggetto: OggettoProvider,
              private nativeStorage: NativeStorage) {
    //this.servizioOggetto.getOggettiPrestati().subscribe(oggetti => this.oggetti = oggetti);
    this.servizioOggetto.getUsers().subscribe(users => this.users = users);
    this.insertedOggetti = [];
  }

  ionViewDidLoad(){
    this.getOggettiStorage();
  }

  getOggettiStorage(){
    this.nativeStorage.getItem('oggetti').then(data => {
      this.insertedOggetti = data;
      console.log(this.insertedOggetti);
    })
  }

  getUser(id: number):string{
    const temp = this.users.find(user => user.id === id);
    return temp.nome;
  }
  
  vaiAllaFormPage(){
    this.navCtrl.push(FormPage);
  }

  vaiPaginaModifica(oggettoInviato: OggettoPrestato){
    this.navCtrl.push(FormPage,
    { oggettoRicevuto: oggettoInviato });
  }

  isRestituito(oggetto: OggettoPrestato){
    if(oggetto.stato === true){
      return 'Si'
    } else return 'No'
  }

  restituito(oggetto: OggettoPrestato){
    oggetto.stato = true;
  }
}
