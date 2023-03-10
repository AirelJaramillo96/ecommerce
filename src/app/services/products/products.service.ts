import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {CreateProductDTO, Product, UpdateProductDTO} from "../../models/product.model";
import {retry, zip} from "rxjs";
import { catchError } from "rxjs";
import { throwError, map } from "rxjs";
import { environment } from 'src/environments/environment';
import { checkTime } from "../../interceptors/time.interceptor";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  private environmentURL = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) { }

  //Optional parameters
  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiUrl, {params});
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.InternalServerError)
        return throwError(() => new Error('Something went wrong!'));
      if (error.status === HttpStatusCode.Unauthorized)
        return throwError(() => new Error('You are not authorized!'));
      if (error.status === 500)
        return throwError(() => new Error('Something went wrong!'));
      if (error.status === 404) {
        return throwError(() => new Error('Product not found! xxxxx'));
      }
      return throwError(() => new Error('Something went wrong!'));
    }));
  }

  getProductByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset },
        context: checkTime()
    }).pipe(retry(3),
      map(products => products.map(product => {
        return {
          ...product,
          taxes: product.price * .16
        }
      }))
    );
  }

  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  updateProduct(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    //this run parallel
    return zip(
      this.getProduct(id),
      this.updateProduct(id, dto)
    )
  }
}
