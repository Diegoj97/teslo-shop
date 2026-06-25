import { Component, computed, input, signal } from '@angular/core';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'product-carousel',
  standalone: true,
  imports: [ProductImagePipe, TranslocoPipe],
  templateUrl: './product-carousel.html',
})
export class ProductCarouselComponent {
  images = input.required<string[]>();
  selectedImage = signal<string | null>(null);

  mainImage = computed(() => {
    const imgs = this.images();
    const selected = this.selectedImage();
    if (selected && imgs.includes(selected)) {
      return selected;
    }
    return imgs.length > 0 ? imgs[0] : '';
  });
}
