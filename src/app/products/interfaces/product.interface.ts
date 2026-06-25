export interface ProductResponse {
  products: Product[];
  pagination: number;
  count: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user?: User;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Gender = 'men' | 'women' | 'kids' | 'unisex';

import { User } from '../../auth/interfaces/auth.interface';
