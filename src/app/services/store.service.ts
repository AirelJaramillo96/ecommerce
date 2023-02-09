import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
 private myShoppingCart: Product[] = [];


  constructor() { }
  addProduct(product: Product) {
    this.myShoppingCart.push(product);
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
