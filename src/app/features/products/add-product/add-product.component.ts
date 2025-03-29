import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '../../../core/components/base.component';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-add-product',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent extends BaseComponent {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

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

  protected override onInit() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      price: [null, Validators.required],
      categoryId: [null, Validators.required]
    });
  }

  categories: Signal<Category[]> = toSignal(this.categoryService.getCategories(), { initialValue: [] });

  onSubmit(): void {
    if (this.formGroup?.invalid) {
      return;
    }

    const product: Product = this.formGroup?.value as Product;

    console.log(this.formGroup?.value);

    this.productService.createProduct(product)
    // .pipe(takeUntilDestroyed())
    .subscribe(() => {
      this.router.navigateByUrl('');
      this.openSnackBar('Add product successfully.');
    });
  }
}
