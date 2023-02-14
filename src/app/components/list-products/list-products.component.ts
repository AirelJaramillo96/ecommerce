import { Component } from '@angular/core';
import {CreateProductDTO, Product} from "../../models/product.model";
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
  showProductDetail: boolean = false;
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

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.productsService.getProduct(id).subscribe(product => {
      this.toggleProductDetail();
      this.productChosen = product;
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
}
