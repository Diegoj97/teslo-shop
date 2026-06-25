import { Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../products/services/product.service';
import { ProductComponent } from '../../../products/components/product/product';
import { map } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-gender-page',
  standalone: true,
  imports: [ProductComponent, TranslocoPipe],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  private readonly _productService = inject(ProductService);

  // Recibimos el parámetro 'gender' de la URL de forma reactiva
  gender = input.required<string>();

  // Cargamos los productos filtrados por género
  public productsResource = rxResource({
    params: () => ({ gender: this.gender() }),
    stream: ({ params }) => this._productService.getAllProducts({ gender: params.gender }).pipe(
      map(response => response.products)
    )
  });
}
