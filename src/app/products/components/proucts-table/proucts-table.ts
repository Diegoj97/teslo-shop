import { Component, computed, input, model } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

import { RouterLink } from '@angular/router';
import { ProductImagePipe } from '../../pipes/product-image.pipe';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'proucts-table',
  imports: [ProductImagePipe, RouterLink, TranslocoPipe],
  templateUrl: './proucts-table.html',
  styles: ``,
})
export class ProuctsTable {
  products = input.required<Product[]>();
  currentPage = model<number>(1);
  totalPages = input<number>(1);

  pagesArray = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  setPage(page: number) {
    this.currentPage.set(page);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
