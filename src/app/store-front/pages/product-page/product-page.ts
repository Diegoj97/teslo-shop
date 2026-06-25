import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../products/services/product.service';
import { ProductImagePipe } from '../../../products/pipes/product-image.pipe';
import { RouterLink } from '@angular/router';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductImagePipe, RouterLink, NotFoundPage, TranslocoPipe],
  templateUrl: './product-page.html',
})
export class ProductPage {
  private readonly _productService = inject(ProductService);

  // Recibimos el parámetro 'id' de la ruta de forma reactiva
  id = input.required<string>();

  // Cargamos el producto utilizando rxResource
  public productResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this._productService.getProduct(params.id)
  });

  // Imagen seleccionada en la galería
  selectedImage = signal<string | null>(null);

  // Computado para obtener la imagen principal (primera por defecto)
  mainImage = computed(() => {
    const customImage = this.selectedImage();
    if (customImage) return customImage;

    const product = this.productResource.value();
    if (product && product.images && product.images.length > 0) {
      return product.images[0];
    }
    return '';
  });

  constructor() {
    // Cuando el ID del producto cambie, reseteamos la selección de imagen
    effect(() => {
      this.id();
      this.selectedImage.set(null);
    });
  }
}
