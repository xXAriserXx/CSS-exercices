import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifica',
  templateUrl: './notifica.component.html',
  styleUrl: './notifica.component.scss'
})
export class NotificaComponent {

  @Input() messaggioCondiviso:any
  @Input() tipoCondiviso:any
  @Input() postiCondiviso:any

  message = ""
  type = ""
  disponibili = "";

  ngOnChanges () {
    this.message = this.messaggioCondiviso
    this.type = this.tipoCondiviso
    this.disponibili = this.postiCondiviso
  }

}
