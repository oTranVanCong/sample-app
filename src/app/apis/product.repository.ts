import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Product } from '../features/products/shared/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductRepository {
  private http = inject(HttpClient);
  private baseAPIUrl: string;

  constructor() {
    this.baseAPIUrl = environment.baseAPIUrl;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseAPIUrl}/products`)
    // Only for mock server
    // In fact, data is processed from the backend side
    .pipe(map((products)=>{
      return products.filter((product) => !product.deleted);
    }));
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseAPIUrl}/products/${productId}`);
  }
  
  createProduct(product: Product): Observable<Product> {
    // Only for mock server
    // In fact, data is processed from the backend side
    product = {
      ...product,
      id: Math.floor(new Date().getTime() / 1000),
      deleted: false,
      createdAt: new Date()
    };

    return this.http.post<Product>(`${this.baseAPIUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    // Only for mock server
    // In fact, data is processed from the backend side
    product = {
      ...product,
      updatedAt: new Date()
    };

    return this.http.patch<Product>(`${this.baseAPIUrl}/products/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.patch<Product>(`${this.baseAPIUrl}/products/${productId}`, {
      deleted: true,
      deletedAt: new Date()
    });
  }
}
