import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Product } from "./product"; /** product.ts de export ettiğimiz Product modelini tanımladık**/
import { ProductModal } from "./product-modal"; /** product.ts de export ettiğimiz Product modelini tanımladık**/
//import {ProductList} from './product-list.mock' /** sahte olarak manuel oluşturduğumuz listeyi ekledik**/   /**artık servis üzerinden çalışıyoruz sanal modele gerek yok*/
import { ProductService } from "./product.service";
import { NotificationsService } from "angular2-notifications";
import { CartService } from "../cart/cart.service";
import { ActivatedRoute } from "@angular/router";
import { Pager } from "../app-pager";
import { NgbTooltipConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/category";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: Product[]; /** burada list a = new list() der gibi tanım yaptık ki component içinde doldurup exprotlayalım */
  addedProduct: string; // Eğer bir ürün eklenirse eklenen ürünün adını server da tutup kullanıcıya  bunu eklediniz demek.
  pager: Pager = new Pager();
  modalProduct: ProductModal; // bunu nedense modal kabul etmedi aşağıdaki gibi tek tek yazdım !! bull shit!
  totality: number;
  category: Category[];
  infoProduct: string;
  closeResult: string;
  _MproductId: number;
  _McategoryId: number;
  _MproductName: string;
  _MquantityPerUnit: string;
  _MunitPrice: number;
  _MunitInStock: number;
  _McategoryName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private notificationsService: NotificationsService,
    private cartService: CartService,
    config: NgbTooltipConfig,
    private modalService: NgbModal,
    private categoryService: CategoryService
  ) {
    //yine list a = new list() der gibi app/product/product.service deki servisi tanımladık.
    //this.products = ProductList;  /**artık servis üzerinden çalışıyoruz sanal modele gerek yok*/
    config.placement = "right"; //burada  tooltip in sağda olmasını istediğimiz belirttik.
  }

  openVerticallyCentered(content, _productId) {
    var product = this.products.find(t => t.productId == _productId);
    this.categoryService.getCategories().subscribe(t => (this.category = t));
    var kategori = this.category.find(r => r.categoryId == product.categoryId);
    this._MproductId = product.productId;
    this._McategoryId = product.categoryId;
    this._MproductName = product.productName;
    this._MquantityPerUnit = product.quantityPerUnit;
    this._MunitPrice = product.unitPrice;
    this._MunitInStock = product.unitInStock;
    this._McategoryName = kategori.categoryName;
    this.modalService.open(content, { centered: true });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getProducts(params["seoUrl"]);
    });
  }

  getProducts(seoUrl: string) {
    this.productService.getProducts(seoUrl).subscribe(p => {
      this.products = p;
      this.pager = this.getPager(p.length);
    });
    // servise subs olduk oradakileri p  ye çekip componentteki Product arrayini ona atadık.
  }

  addToCart(product: Product) {
    this.addedProduct = product.productName;
    this.cartService.addToCart(product);
    this.notificationsService.success(
      "Successfull",
      product.productName + " added to cart!"
    );
  }

  getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 3
  ): Pager {
    let totalPages = Math.ceil(totalItems / pageSize);
    let pages: Array<number> = [];

    this.totality = Math.ceil(totalPages * 10);

    for (let i = 0; i <= totalPages; i++) {
      pages.push(i);
    }

    var pager = new Pager();
    pager.currentPage = currentPage;
    pager.pageList = pages;
    pager.pageSize = pageSize;

    return pager;
  }
}
