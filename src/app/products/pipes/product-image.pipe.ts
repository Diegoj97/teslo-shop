import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'productImage',
  standalone: true
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[] | undefined): string {
    const fallbackImage = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp';

    if (!value) {
      return fallbackImage;
    }

    let image = '';
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return fallbackImage;
      }
      image = value[0];
    } else {
      image = value;
    }

    if (image.startsWith('http') || image.startsWith('blob:')) {
      return image;
    }

    return `${environment.baseUrl}/files/product/${image}`;
  }
}
