import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '../../interfaces/product.interface';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ProductImagePipe, TranslocoPipe],
  templateUrl: './product.html',
})
export class ProductComponent {
  producto = input.required<Product>();
}
