import { Component } from '@angular/core';
import {Product} from "../../models/product.model";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {

  myShoppingCart: Product[] = [];
  products: Product[] = [
    {
      id: '1',
      name: 'EL mejor juguete',
      price: 565,
      img: './assets/images/toy.jpg'
    },
    {
      id: '2',
      name: 'Bicicleta casi nueva',
      price: 356,
      img: './assets/images/bike.jpg'
    },
    {
      id: '3',
      name: 'Colleción de albumnes',
      price: 34,
      img: './assets/images/album.jpg'
    },
    {
      id: '4',
      name: 'Mis libros',
      price: 23,
      img: './assets/images/books.jpg'
    },
  ];
  total = 0;

  constructor(private storeService: StoreService) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  formatTotal(total: number) {
    return this.storeService.getFormatTotal(total);
  }



}
