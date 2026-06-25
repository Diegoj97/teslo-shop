import { Component, computed, inject, signal } from '@angular/core';
import { ProductComponent } from '../../../products/components/product/product';
import { ProductService } from '../../../products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductComponent, TranslocoPipe],
  templateUrl: './home-page.html',
})
export class HomePage {
  private readonly _productService = inject(ProductService);

  // Paginación reactiva
  currentPage = signal<number>(1);
  limit = 8; // 8 productos por página (perfecto para cuadrícula de 4 columnas)

  // Definimos el recurso para cargar la página actual
  public productsResource = rxResource({
    params: () => ({ 
      page: this.currentPage(),
      limit: this.limit
    }),
    stream: ({ params }) => {
      const offset = (params.page - 1) * params.limit;
      return this._productService.getAllProducts({ limit: params.limit, offset }).pipe(
        tap((response) => console.log(`Productos cargados (Pág. ${params.page}):`, response))
      );
    }
  });

  // Total de páginas computado
  totalPages = computed(() => {
    const response = this.productsResource.value();
    if (!response) return 1;
    return Math.ceil(response.count / this.limit);
  });

  // Arreglo de números de página para iterar en el HTML
  pagesArray = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  // Métodos para navegar
  setPage(page: number) {
    this.currentPage.set(page);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}
