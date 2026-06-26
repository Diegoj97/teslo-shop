import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product, Size, Gender } from '../../../../products/interfaces/product.interface';
import { ProductCarouselComponent } from '../../../../products/components/product-carousel/product-carousel';
import { FormUtils } from '../../../../shared/utils/form-utils';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-product-detail',
  imports: [ReactiveFormsModule, ProductCarouselComponent, RouterLink, TranslocoPipe],
  templateUrl: './product-detail.html',
  styles: ``,
})
export class ProductDetail {

  product = input.required<Product>();
  onSave = output<Partial<Product>>();

  private readonly _fb = inject(FormBuilder);

  public FormUtils = FormUtils;
  public readonly sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  public selectedSizes = signal<Set<Size>>(new Set());

  public productForm: FormGroup = this._fb.group({
    title: ['', [Validators.required]],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    description: [''],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(1)]],
    tags: [''],
    gender: ['men', [Validators.required]],
    images: [[] as string[]],
  });

  constructor() {
    effect(() => {
      const prod = this.product();
      this.productForm.patchValue({
        title: prod.title,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        stock: prod.stock,
        tags: prod.tags.join(', '),
        gender: prod.gender,
        images: prod.images,
      });
      this.selectedSizes.set(new Set(prod.sizes));
    });
  }

  setGender(gender: Gender) {
    this.productForm.patchValue({ gender });
  }

  toggleSize(size: Size) {
    const current = new Set(this.selectedSizes());
    if (current.has(size)) {
      current.delete(size);
    } else {
      current.add(size);
    }
    this.selectedSizes.set(current);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const { tags, ...rest } = this.productForm.value;

    const tagsArray = tags
      ? tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0)
      : [];

    const updatedProduct: Partial<Product> = {
      ...rest,
      sizes: Array.from(this.selectedSizes()),
      tags: tagsArray,
    };

    console.log('Saved product data:', updatedProduct);
    this.onSave.emit(updatedProduct);
  }

  onFileSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFiles = Array.from(input.files);
      const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
      const currentImages: string[] = this.productForm.get('images')?.value || [];
      this.productForm.patchValue({ images: [...currentImages, ...imageUrls] });
    }
  }
}

