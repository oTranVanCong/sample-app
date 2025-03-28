import { inject, Injectable, Signal } from '@angular/core';
import { ProductRepository } from '../../../apis/product.repository';
import { Product } from './product.model';
import { map, Observable } from 'rxjs';
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private repository = inject(ProductRepository);
  private categoryService = inject(CategoryService);

  getProducts(): Observable<Product[]> {
    let products$ = this.repository.getProducts();

    return products$.pipe(map((products) => {
      return products.map((item) => {
        return {
          ...item,
          category: this.categoryService.getCategory(item.categoryId)
        };  
      })
    }))
  }

  getProduct(productId: number): Observable<Product> {
    return this.repository.getProduct(productId);
  }

  createProduct(product: Product): Observable<Product> {
    return this.repository.createProduct(product);
  }
  
  updateProduct(product: Product): Observable<Product> {
    return this.repository.updateProduct(product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.repository.deleteProduct(productId);
  }


}
