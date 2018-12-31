import { Component, OnInit } from '@angular/core';
import { CartItem } from './cart-item';
import { Product } from '../product/product';
import { CartService } from './cart.service';
import { CookieService } from 'angular2-cookie/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
    private cookieService: CookieService,
    private router: Router) { }

  isProductRemoved: boolean = false; 
  cartItems: CartItem[] = [];
  cartToList;

  ngOnInit() {
    this.cartItems = this.cartService.list();
    this.cartToList = this.cartService.cookieList();
  }

  removeFromCart(product: Product) {
    if (confirm("Are You Sure?")) {
      this.cartService.removeFromCart(product);
      this.isProductRemoved = true;
    }
  }

  decreaseFromCart(product: Product) {
    this.cartService.decreaseFromCart(product);
  }

  addFromCookies() {
    var a: Product[] = [];
    var i, j: number;

    var addition = this.cartService.cookieList();
    var additionLength = Object.keys(addition).length;

    for (j = 0; j < additionLength; j++) {
      for (i = 0; i < addition[j].quantity; i++) { // kaç ürün eklenmişse döngüde o kadar ekler listeye 

        a = new function () {
          this[i] = {
            productId: addition[j].product.productId,
            categoryId: addition[j].product.categoryId,
            productName: addition[j].product.productName,
            quantityPerUnit: addition[j].product.quantityPerUnit,
            unitPrice: addition[j].product.unitPrice,
            unitInStock: addition[j].product.unitInStock

          };
        };

        console.log(a);
        this.cartService.addToCart(a[i]);
      }
    }

  }

  removeFromCookies() {
    var onay = confirm('Are you sure to leave?');
    if (onay) {
      this.cookieService.remove('cartUser');
      this.router.navigate(["products"]);
    }
  }
  
}
