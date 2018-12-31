import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../product/product";
import { ProductService } from "../product/product.service";
import { Observable } from "rxjs";
import { templateSourceUrl } from "@angular/compiler";
import { Category } from "./category";

@Pipe({
  name: "categoryProductItems"
})
export class CategoryProductItemsPipe implements PipeTransform {
  constructor(private productService: ProductService) {}

  products: Product[];
  category: Category[];
  countArray: number[];
  //ileride kategorilerin yanında onlardan kaç ürün olduğunu göstermek için kullanıcam.

  transform(value: number, seoUrl?: string): any {
    if (seoUrl) {
      debugger;
     this.productService.getProducts(seoUrl).forEach(element => {
        console.log(element);
        //alert(element.length);
        var a  = Math.ceil(element.length); 
        alert(value);
      });
    } else {
      this.productService.getProducts("").forEach(element => {
        console.log(element);
        value = element.length;
      });
      return value;
    }
  }
 
 
  // transform(value: number, seoUrl?: string, cateId?:number): any {
  //   if (seoUrl) {
  //     this.productService.getProducts(seoUrl).subscribe(element => {
  //       this.products = element; 
  //       alert(this.products.filter((p: Product) => p.categoryId === cateId).length);
  //     });
  //     return this.products.filter((p: Product) => p.categoryId === cateId).length;
  //   } else {
  //     this.productService.getProducts("").subscribe(element => {
  //       this.products = element;
  //     });
  //     return this.products.filter((p: Product) => p.categoryId === cateId).length;
  //   }
  // }


}


 