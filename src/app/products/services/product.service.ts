import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product, ProductResponse } from "../interfaces/product.interface";
import { environment } from "../../../environments/environment";

interface Options {
    limit?: number;
    offset?: number;
    gender?: string;
}
@Injectable({
    providedIn: "root",
})
export class ProductService {
    private readonly _baseUrl = environment.baseUrl;
    private readonly _http = inject(HttpClient);

    //metodo para obtener todos los productos esperamos un tipo observable tipo ProductResponse
    getAllProducts(options: Options = {}): Observable<ProductResponse> {
        const { limit = 10, offset = 0, gender = '' } = options;
        return this._http.get<ProductResponse>(`${this._baseUrl}/products`, { params: { limit, offset, gender } });
    }

    // Método para obtener un único producto por ID o slug
    getProduct(id: string): Observable<Product> {
        return this._http.get<Product>(`${this._baseUrl}/products/${id}`);
    }

    getProductById(id: string): Observable<Product> {
        return this._http.get<Product>(`${this._baseUrl}/products/${id}`);
    }

    updateProduct(id: string, product: Partial<Product>): Observable<Product> {
        return this._http.patch<Product>(`${this._baseUrl}/products/${id}`, product);
    }

    createProduct(product: Partial<Product>): Observable<Product> {
        return this._http.post<Product>(`${this._baseUrl}/products`, product);
    }
}
