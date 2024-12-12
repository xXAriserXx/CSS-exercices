import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IScarpa } from '../../models/IScarpa';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  colore: string;
  disponibile: boolean = true;
  foto: string;
  id: number;
  nome: string;
  prezzo: number;
  quantita: number;
  erroreForm: boolean = false;
  coloreScelto:string;
  titoloSelect:string = "Seleziona la taglia"
  taglia: number | string = this.titoloSelect;
  taglie:Array<string | number> = [this.titoloSelect, 39, 40, 41, 42, 43, 44, 45];
  colori:Array<string> = ["Rosso", "Blu", "Nero", "Bianco"];

  @Input () arrayScarpe:Array<IScarpa>

  @Output() addScarpaEvent = new EventEmitter<IScarpa>
  @Output() indietroFormEvent = new EventEmitter

  indietro () {
    this.indietroFormEvent.emit();
  }

  mandaScarpa () {
      if (this.controllo() === true) {
        const scarpaDaMandare = {
          id: this.calcolaMaxId() + 1,
          nome: this.nome,
          colore: this.coloreScelto,
          prezzo: this.prezzo,
          quantita: this.quantita,
          taglia: this.taglia,
          foto: this.foto,
          disponibile: this.disponibile
        } 
        this.addScarpaEvent.emit(scarpaDaMandare)
        console.log(this.arrayScarpe)
      }
  }

  controllo () {
    if (this.nome == null || this.coloreScelto == null || this.prezzo == null || isNaN(this.prezzo) || isNaN(this.quantita) || this.quantita == null || this.taglia == null || this.foto == null) {
      this.erroreForm = true;
      return false
    } else {
      return true
    }

  }

  calcolaMaxId () {
    let max = 10;
    this.arrayScarpe.forEach(

      (scarpa) => {
        if (scarpa.id > max) {
          max = scarpa.id
        }
      }
    )
    return max
  }
}
