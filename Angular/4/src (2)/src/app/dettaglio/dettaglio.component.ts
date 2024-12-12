import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Iproduct } from '../models/IModels';
import { CommonModule } from '@angular/common';
import { IvaPipe } from '../pipes/iva.pipe';
import { IvaTOTPipe } from '../pipes/iva-tot.pipe';

@Component({
  selector: 'app-dettaglio',
  standalone: true,
  imports: [CommonModule, IvaPipe, IvaTOTPipe],
  templateUrl: './dettaglio.component.html',
  styleUrl: './dettaglio.component.css'
})
export class DettaglioComponent {

  constructor (private productsServerice:ProductsService) {}

  @Output() chiudiEvent = new EventEmitter();
  @Input() prodottoId:Iproduct

  prodottoRichiesto:Iproduct = {
    "id": undefined,
    "productName": "",
    "quantity": undefined,
    "unitPrice": undefined
  }

  total_Amount:number

  ngOnInit () {
    console.log(this.prodottoId)
    this.productsServerice.getDetailProduct(this.prodottoId).subscribe({
      next: (data) => {
        this.prodottoRichiesto = data
        this.total_Amount = this.prodottoRichiesto.quantity * this.prodottoRichiesto.unitPrice 
      }

    })
  }
  

  chiudi() {
    this.chiudiEvent.emit()
  }



}
