import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { find, map, Observable } from 'rxjs';
import { Iproduct } from '../models/IModels';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getListOrders(): Observable<Iproduct[]> {
    return this.http.get("http://localhost:3000/orders").pipe( map((orders:Iproduct[]) => orders.map((o:Iproduct) => ({ ...o, total: o.quantity * o.unitPrice }))),
    )
  }



  getDetailProduct(productId): Observable<Iproduct> {
    return this.http.get<Iproduct[]>("http://localhost:3000/orders").pipe(
      map((response) => response.find((response) => response.id === productId))
    );
  }
  
}
