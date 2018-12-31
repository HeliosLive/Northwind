import { Injectable, Inject } from '@angular/core';
import{Http,Headers,Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';    
import {Category} from './category'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private htpp:Http,@Inject("apiUrl") private apiUrl) { }

  url :string = this.apiUrl + "/categories";
  getCategories ():Observable<Category[]>{
    return this.htpp.get(this.url).map(response=>response.json());
  }
}
