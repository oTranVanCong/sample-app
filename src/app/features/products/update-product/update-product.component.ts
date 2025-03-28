import { Component, effect, inject, signal, Signal } from '@angular/core';
import { BaseComponent } from '../../../core/components/base.component';
import { ProductService } from '../shared/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../shared/product.model';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../categories/shared/category.service';
import { Category } from '../../categories/shared/category.model';

@Component({
  selector: 'app-update-product',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent extends BaseComponent {
  private productId!: number;
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  categories: Signal<Category[]> = toSignal(this.categoryService.getCategories(), { initialValue: [] });
  product: Signal<Product | null> = signal(null);
  
  get name(): AbstractControl | null {
    return this.getControl('name');
  }
  
  get price(): AbstractControl | null {
    return this.getControl('price');
  }
  
  get description(): AbstractControl | null {
    return this.getControl('description');
  }

  get categoryId(): AbstractControl | null {
    return this.getControl('categoryId');
  }

  constructor() {
    super();

    const state = this.router?.getCurrentNavigation()?.extras.state;

    if (!state) {
      this.router.navigateByUrl('');
      
      return;
    }

    this.productId = parseInt(state['id']);
    this.product = toSignal(this.productService.getProduct(this.productId), { initialValue: null });
    
    effect(() => {
      const currentProduct = this.product();

      if (!currentProduct) {
        return;
      }

      this.formGroup?.setValue({
        name: currentProduct?.name,
        description: currentProduct?.description,
        price: currentProduct?.price,
        categoryId: currentProduct?.categoryId,
      });
    });
  }

  protected override onInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      price: [null, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formGroup?.invalid) {
      return;
    }

    let product: Product = this.formGroup?.value as Product;

    product = {
      ...product,
      id: this.product()?.id || 0
    };

    console.log(this.formGroup?.value);

    this.productService.updateProduct(product)
    // .pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.router.navigateByUrl('');
      this.openSnackBar('Update product successfully.');
    });
  }
}
