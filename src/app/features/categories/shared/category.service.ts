import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  /*
  * Mock categories
  * In fact, they are gotten from the backend API
  */
  private categories: Category[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },
  ];

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategory(id: number): Category | undefined {
    return this.categories.find((item) => item.id === id);
  }
}
