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
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {id: '', name: ''}
  };

  constructor() { }

  ngOnInit(): void {
  }

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<string>();

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showDetail.emit(this.product.id);
  }

}
