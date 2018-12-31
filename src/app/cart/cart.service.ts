import { Injectable } from '@angular/core';
import { Product } from '../product/product';
import { CartItem } from './cart-item'
import { CART_ITEM_LIST } from './cart-item-list'
import { CookieService } from 'angular2-cookie/core'


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[];
  constructor(private cookieService: CookieService) { }

  addToCart(product: Product): void {
    var addedItem = CART_ITEM_LIST.find(t => t.product.productId == product.productId)
    if (addedItem) {
      addedItem.quantity += 1;
      this.cookieService.putObject('cartUser', CART_ITEM_LIST);
    }
    else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      CART_ITEM_LIST.push(cartItem);
      this.cookieService.putObject('cartUser', CART_ITEM_LIST);
      console.log('CartUserCookie : ', this.cookieService.getObject('cartUser'));
      console.log('CART_ITEM_LIST : ', CART_ITEM_LIST);
    }
  }

  list(): CartItem[] {
    return CART_ITEM_LIST;
  }

  cookieList() {
    return this.cookieService.getObject('cartUser');
  }

  clear() {
    CART_ITEM_LIST.splice(0, CART_ITEM_LIST.length);
    this.cookieService.remove('cartUser');
  }

  removeFromCart(product: Product) {
    var addedItem = CART_ITEM_LIST.find(t => t.product.productId == product.productId)
    var indexNo = CART_ITEM_LIST.indexOf(addedItem);
    if (indexNo != -1) {
      CART_ITEM_LIST.splice(indexNo, 1);
      this.cookieService.remove('cartUser');
      this.cookieService.putObject('cartUser', CART_ITEM_LIST);
    }

  }

  decreaseFromCart(product: Product) {
    var Item = CART_ITEM_LIST.find(t => t.product.productId == product.productId)
    if (Item.quantity > 1) {
      Item.quantity -= 1;
    }
    else {
      alert("This Product Completely Removed From Cart");
      this.removeFromCart(product);
    }
  }

}
