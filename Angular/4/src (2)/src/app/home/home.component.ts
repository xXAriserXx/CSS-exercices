import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Iproduct } from '../models/IModels';
import { CommonModule } from '@angular/common';
import { DettaglioComponent } from '../dettaglio/dettaglio.component';
import { IvaTOTPipe } from '../pipes/iva-tot.pipe';
import { IvaPipe } from '../pipes/iva.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DettaglioComponent, IvaTOTPipe, IvaPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private productService:ProductsService) {}
  products: Array<Iproduct>
  dettaglioAttivo:boolean = false
  prodottoDettaglio:Iproduct
  total_Amount:number = 0

  ngOnInit () {
    this.productService.getListOrders().subscribe({
      next: (data:Array<Iproduct>) => {
        this.products = data
        for (let prodotto of this.products) {
          this.total_Amount += prodotto.quantity * prodotto.unitPrice
        }
      }
    })
  }

  dettaglio (prodotto) {
    this.dettaglioAttivo = true 
    this.prodottoDettaglio=prodotto
  }

  chiudi () {
    this.dettaglioAttivo = false
  }



  

}
