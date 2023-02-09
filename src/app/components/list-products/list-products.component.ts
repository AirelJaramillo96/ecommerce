import { Component } from '@angular/core';
import {Product} from "../../models/product.model";
import { StoreService } from "../../services/store.service";
import { ProductsService } from "../../services/products/products.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {

  myShoppingCart: Product[] = [];
  products: Product[] = [];
  total = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  formatTotal(total: number) {
    return this.storeService.getFormatTotal(total);
  }



}
