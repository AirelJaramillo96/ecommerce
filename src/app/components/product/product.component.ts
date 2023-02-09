import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Product} from "../../models/product.model";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
    id: '',
    name: '',
    price: 0,
    img: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  @Output() addedProduct = new EventEmitter<Product>();

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }



}
