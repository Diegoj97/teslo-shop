import { Component, computed, effect, inject, input, } from '@angular/core';
import { ProductService } from '../../../products/services/product.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ProductDetail } from './product-detail/product-detail';
import { Product } from '../../../products/interfaces/product.interface';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetail],
  templateUrl: './product-admin-page.html',
  styles: ``,
})
export class ProductAdminPage {

  id = input.required<string>();
  productService = inject(ProductService);
  private router = inject(Router);

  public productResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => {
      if (params.id === 'new') {
        const defaultProduct: Product = {
          id: '',
          title: '',
          price: 0,
          description: '',
          slug: '',
          stock: 0,
          sizes: [],
          gender: 'men',
          tags: [],
          images: []
        };
        return of(defaultProduct);
      }
      return this.productService.getProductById(params.id);
    }
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  });

  onSaveProduct(updatedProduct: Partial<Product>) {
    const saveObservable = this.id() === 'new'
      ? this.productService.createProduct(updatedProduct)
      : this.productService.updateProduct(this.id(), updatedProduct);

    saveObservable.subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (err) => {
        console.error('Error saving product:', err);
      }
    });
  }
}
