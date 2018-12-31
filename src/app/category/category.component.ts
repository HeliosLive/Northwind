import { Component, OnInit } from "@angular/core";
import { Category } from "./category";
import { CategoryService } from "./category.service";
import { Product } from "../product/product";
import { ProductService } from "../product/product.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  categories: Category[];
  product: Product[];
  selectedCategory: Category;
  AllCount: number;

  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        response[i].productCount = this.product.filter(
          p => p.categoryId === response[i].categoryId
        ).length;
      } 
      this.AllCount = Math.ceil(this.product.length);
      this.categories = response;
    });
  }
  ngOnInit() {
    this.getAllProduct();
    this.getCategories();
  }

  onSelect(category?: Category) {
    if (category) {
      //alert("asdasdas" + category.seoUrl);
      this.selectedCategory = category;
    } else {
      this.selectedCategory = null;
    }
  }

  getAllProduct() {
    this.productService.getProducts("").subscribe(res => {
      this.product = res;
    });
  }
}
