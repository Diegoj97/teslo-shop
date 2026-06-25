import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProuctsTable } from "../../../products/components/proucts-table/proucts-table";
import { ProductService } from '../../../products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProuctsTable, RouterLink, TranslocoPipe],
  templateUrl: './products-admin-page.html',
  styles: ``,
})
export class ProductsAdminPage {
  private readonly _productService = inject(ProductService);
  private readonly router = inject(Router);

  currentPage = signal<number>(1);
  limit = 10; // 10 productos por página en la tabla

  public productsResource = rxResource({
    params: () => ({
      page: this.currentPage(),
      limit: this.limit
    }),
    stream: ({ params }) => {
      const offset = (params.page - 1) * params.limit;
      return this._productService.getAllProducts({ limit: params.limit, offset });
    }
  });

  redirectEffect = effect(() => {
    const error = this.productsResource.error();
    if (error) {
      this.router.navigate(['/admin/products']);
    }
  })

  public products = computed(() => this.productsResource.value()?.products ?? []);
  public totalProducts = computed(() => this.productsResource.value()?.count ?? 0);
  public isLoading = this.productsResource.isLoading;

  totalPages = computed(() => {
    const response = this.productsResource.value();
    if (!response) return 1;
    return Math.ceil(response.count / this.limit);
  });

}
