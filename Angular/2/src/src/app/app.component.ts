import { Component } from '@angular/core';
import { stanze } from './data/stanze';
import { IStanza } from './models/IStanze';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title:string = 'my-app';
  stanze:Array<IStanza> = stanze;
  stanzePrenotate:Array<IStanza> = [];
  tot_stanze_prenotate:number = 0;
  statoDiConferma: boolean = false

  prenotaStanza (stanza:IStanza, bottone:HTMLButtonElement) : void {
    this.stanzePrenotate.push(stanza);
    this.tot_stanze_prenotate += stanza.prezzo;
    stanza.disponibile = false;
    bottone.disabled = true;
    bottone.innerText = "Prenotato";
    stanza.button = bottone;
  }

  rimuoviPrenotazione (stanza:IStanza, i:number) : void {
    this.stanzePrenotate = this.stanzePrenotate.filter(a => a.id !== stanza.id);
    //this.stanzePrenotate.splice(i, 1); SOLUZIONE CON SPLICE
    this.tot_stanze_prenotate -= stanza.prezzo
    stanza.button.disabled = false 
    stanza.button.innerText = "Disponibile"
  }

  conferma () : void {
    this.statoDiConferma = true;
    document.querySelector("body").style.overflow = "hidden";
  }

  confermaPrenotazione () : void {
    window.location.reload();
  }

  annullaPrenotazione () : void {
    this.statoDiConferma = false;
    document.querySelector("body").style.overflow = "unset";
  }

}
