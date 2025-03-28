import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal, Signal, WritableSignal } from '@angular/core';
import { Product } from '../shared/product.model';
import { BaseComponent } from '../../../core/components/base.component';
import { ProductService } from '../shared/product.service';
import { toSignal } from '@angular/core/rxjs-interop';

import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTableModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    CurrencyPipe,
    DatePipe,
    RouterLink
  ]
})
export class ProductListComponent extends BaseComponent {
  private productService = inject(ProductService);
  private _products: Signal<Product[]> = toSignal(this.productService.getProducts(), { initialValue: [] });

  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'createdAt', 'actions'];
  products = linkedSignal(() => this._products());

  onDelete(productId: number) {
    const dialogRef: MatDialogRef<any, any> = this.openDialog('Do you really want to delete this one?');

    dialogRef.afterClosed().subscribe((value: boolean) => {
      if (!value) {
        return;
      }

      this.productService.deleteProduct(productId)
      .pipe(switchMap(() => {
        return this.productService.getProducts();
      }))
      .subscribe((products) => {
        this.products.set(products);

        this.openSnackBar('Delete product successfully.');
      });
    });
    
  }
}
