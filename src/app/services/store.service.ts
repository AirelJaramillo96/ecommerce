import { Injectable } from '@angular/core';
import { Product } from "../models/product.model";
import { BehaviorSubject } from 'rxjs';

// this is a service that will be used to store the products that the user has added to the shopping cart
@Injectable({
  providedIn: 'root'
})

export class StoreService {
 private myShoppingCart: Product[] = [];
 private myCart = new BehaviorSubject<Product[]>([]);

 myCart$ = this.myCart.asObservable();


  constructor() { }
  addProduct(product: Product) {
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal () {
    return this.myShoppingCart.reduce((total, product) => total + product.price, 0);
  }

  getMyShoppingCart() {
    return this.myShoppingCart;
  }

  getFormatTotal(total: number) {
    //Format number to DLS currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(total);
  }
}
