import { Component } from '@angular/core';
import {CreateProductDTO, Product} from "../../models/product.model";
import { StoreService } from "../../services/store.service";
import { ProductsService } from "../../services/products/products.service";
import Swal from "sweetalert2";

import { switchMap } from "rxjs/operators";
import { zip } from "rxjs";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {

  myShoppingCart: Product[] = [];
  products: Product[] = [];
  showProductDetail: boolean = false;
  limit: number = 10;
  offset: number = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {id: '', name: ''}
  }

  total = 0;
  today = new Date();
  date = new Date(2023, 1, 1);

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore()
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  formatTotal(total: number) {
    return this.storeService.getFormatTotal(total);
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id).subscribe(product => {
      this.toggleProductDetail();
      this.productChosen = product;
      this.statusDetail = 'success';
    }, response => {
      this.statusDetail = 'error';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    })
  }

  readAndUpdate(id: string) {
    //this run serial
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.updateProduct(product.id, {title: 'change'}))
      )
      .subscribe(data => {
        console.log(data);
    })

    this.productsService.fetchReadAndUpdate(id, {title: 'change'}).subscribe( response => {
      const read = response[0];
      const update = response[1];

      console.log(read, update);
    })

  }



  createNewProduct() {
    const newProduct: CreateProductDTO = {
      title: 'New Product',
      price: 100,
      images: ['https://placeimg.com/640/480/any?random=${Math.random()}'],
      description: 'New Product Description',
      categoryId: 2,
    }
    this.productsService.createProduct(newProduct).subscribe(product => {
      this.products.unshift(product);
    });
  }

  updateProduct() {
    const updateProduct: CreateProductDTO = {
      title: 'Updated Product xx',
      price: 100,
      images: ['https://placeimg.com/640/480/any?random=${Math.random()}'],
      description: 'Updated Product Description',
      categoryId: 2,
    }
    this.productsService.updateProduct(this.productChosen.id, updateProduct).subscribe(product => {
      const index = this.products.findIndex(p => p.id === product.id);
      this.products[index] = product;
      this.productChosen = product;
    });
  }

  deleteProduct() {
    this.productsService.deleteProduct(this.productChosen.id).subscribe(() => {
      const index = this.products.findIndex(p => p.id === this.productChosen.id);
      this.products.splice(index, 1);
      this.toggleProductDetail();
    });
  }

  loadMore() {
    this.productsService.getProductByPage(this.limit, this.offset).subscribe(products => {
      this.products = this.products.concat(products);
      this.offset += this.limit;
    })
  }
}
