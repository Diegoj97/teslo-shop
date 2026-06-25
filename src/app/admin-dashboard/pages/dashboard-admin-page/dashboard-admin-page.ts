import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-dashboard-admin-page',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './dashboard-admin-page.html',
})
export class DashboardAdminPage {
  private readonly _productService = inject(ProductService);

  public productsResource = rxResource({
    params: () => ({ limit: 100 }),
    stream: ({ params }) => this._productService.getAllProducts({ limit: params.limit })
  });

  public products = computed(() => this.productsResource.value()?.products ?? []);
  public totalProducts = computed(() => this.productsResource.value()?.count ?? 0);
  public isLoading = this.productsResource.isLoading;

  public outOfStockCount = computed(() => {
    return this.products().filter(p => p.stock === 0).length;
  });

  public lowStockCount = computed(() => {
    return this.products().filter(p => p.stock > 0 && p.stock <= 5).length;
  });

  public genderStats = computed(() => {
    const list = this.products();
    const stats = { men: 0, women: 0, kids: 0, unisex: 0 };
    list.forEach(p => {
      if (p.gender === 'men') stats.men++;
      else if (p.gender === 'women') stats.women++;
      else if (p.gender === 'kids') stats.kids++;
      else if (p.gender === 'unisex') stats.unisex++;
    });
    return stats;
  });
}
