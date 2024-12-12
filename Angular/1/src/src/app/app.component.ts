import { Component } from '@angular/core';
import { IScarpa } from '../models/IScarpa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title:string = 'my-app';
  scarpe:Array<IScarpa> = [];
  dettaglio:boolean = false;
  form:boolean = false;
  scarpaScelta:IScarpa;
  scarpeAttivo:boolean = true;
  bottoneCarica:boolean = true;
  aggiungiAttivo = false;

  caricaScarpe () {
    fetch('http://localhost:3000/scarpe')
    .then(risposta => risposta.json())
    .then(data => {
      this.scarpe = data;
      this.bottoneCarica = false;
      this.aggiungiAttivo = true;
    })
    .catch (error => {console.log(`Errore: ${error}`)})
  }

  vediDettaglio (scarpa) {
    this.dettaglio = true;
    this.scarpaScelta = scarpa;
    this.form = false;
    this.scarpeAttivo = false;
    this.aggiungiAttivo = false;
  }

  rimuoviScarpa (scarpaScelta) {
    if (confirm("Sei sicuro di voler rimuovere " + scarpaScelta.nome)) {
    this.scarpe = this.scarpe.filter(scarpa => scarpa.id != scarpaScelta.id);
    this.dettaglio = false;
    this.scarpeAttivo = true;
    this.aggiungiAttivo = true;
    this.form = false;
    }
  }

  apriForm () {
    this.form = true;
    this.dettaglio = false;
    this.scarpeAttivo = false;
    this.aggiungiAttivo = false;
  }

  aggiungiScarpa (scarpaDaMandare) {
    console.log(scarpaDaMandare)
    this.scarpe.push(scarpaDaMandare)
    this.form = false;
    this.scarpeAttivo = true;
    this.dettaglio = false;
    this.aggiungiAttivo = true;
  }

  indietro () {
    this.dettaglio = false;
    this.scarpeAttivo = true;
    this.form = false;
    this.aggiungiAttivo = true;
  }




  
  
  
  
} 