import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IScarpa } from '../../models/IScarpa';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrl: './dettaglio.component.css'
})

export class DettaglioComponent {
  @Input() scarpa:IScarpa

  @Output() rimuoviScarpaEvent = new EventEmitter<IScarpa>
  @Output() indietroDetailEvent = new EventEmitter

  cancella () {
    this.rimuoviScarpaEvent.emit(this.scarpa);
  }

  indietro () {
    this.indietroDetailEvent.emit()
  }
}

