import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Product } from '../models/product.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private products: Product[] = [];
    private baseUrl = '/api/ipf-msa-productosfinancieros/bp/products';
    private authorId = '23';

    constructor(private http: HttpClient) { }

    addProducts(products: Product[]) {
        this.products = products;
    }

    getProductById(id: string): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    getProducts(): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            this.http.get<Product[]>(this.baseUrl, { headers: { 'authorId': this.authorId } })
                .pipe(
                    catchError(error => {
                        if (error.status === 400) {
                            console.error('Error 400: Header \'authorId\' is missing');
                        } else {
                            console.error('Error desconocido:', error);
                        }
                        return throwError(() => error);
                    })
                )
                .subscribe({
                    next: response => {
                        this.addProducts(response);
                        resolve(response);
                    },
                    error: error => {
                        reject(error);
                    }
                });
        });
    }

    postProducts(data: Product): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            this.http.post<Product[]>(this.baseUrl, data, { headers: { 'authorId': this.authorId }, observe: 'response' })
                .subscribe({
                    next: (response: HttpResponse<any>) => {
                        if (response.status !== 200) {
                            if (response.status === 206) {
                                console.error('Error 206: Partial Content');
                                reject(response);
                            } else {
                                console.error('Error desconocido:', response.statusText);
                                reject(response.statusText);
                            }
                        } else {
                            resolve(response.body);
                        }
                    },
                    error: (error) => {
                        console.error('Error al cargar el producto:', error);
                        reject(error);
                    }
                });
        });
    }

    putProduct(data: Product): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            this.http.put<Product[]>(this.baseUrl, data, { headers: { 'authorId': this.authorId } })
                .subscribe({
                    next: response => {
                        resolve(response);
                    },
                    error: error => {
                        console.error('Error al editar el productos:', error);
                        reject(error);
                    }
                });
        });
    }

    deleteProduct(data: Product): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.http.delete(this.baseUrl + '?id=' + data.id, {
                headers: { 'authorId': this.authorId },
                responseType: 'text'
            })
                .subscribe({
                    next: response => {
                        if (response === 'Product successfully removed') {
                            resolve(response);
                        } else {
                            console.error('Error en la respuesta del servidor:', response);
                            reject('Unexpected server response');
                        }
                    },
                    error: error => {
                        console.error('Error al eliminar el producto:', error);
                        reject(error);
                    }
                });
        });
    }

}