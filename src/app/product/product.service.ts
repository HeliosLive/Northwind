import { Injectable, Inject } from '@angular/core';
import { Product } from './product';
//import {ProductList} from './product-list.mock'   artık servisle çalışıyoruz gerek yok buna.
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http, @Inject('apiUrl') private apiUrl) { }
  // Http yi tanımlıyoruz kullanabilmek için.
  // app.module provide daki tanımladığımız apiUrl i çekip burada private olarak tanımlıyoruz.

  getProducts(seoUrl: string): Observable<Product[]> {
    if (seoUrl) {
      return this.http.get(this.apiUrl + "/products/" + seoUrl)  
        .map((response: Response) => response.json());
    }
    else {
      return this.http.get(this.apiUrl + "/products")  // http://northwindapi.azurewebsites.net/api/ eskidendi artık global bu kısmı
        .map((response: Response) => response.json());
    } 
  }
 

}
