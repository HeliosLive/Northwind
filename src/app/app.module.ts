import { BrowserModule } from '@angular/platform-browser';
import { NgModule, RootRenderer } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {Routes,RouterModule} from '@angular/router'

import { SimpleNotificationsModule, SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';  

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';
import { CartSummaryComponent } from './cart/cart-summary/cart-summary.component';
import { LoggedComponent } from './account/logged/logged.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartService } from './cart/cart.service';
import { VatAddedPipe } from './product/vat-added.pipe';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { CategoryProductItemsPipe } from './category/category-product-items.pipe';
import { AccountService } from './account/account.service';
import { LoginGuard } from './account/login.guard';
import { PendingChangesGuard } from './guards/pending-changes.guard';
import {CookieService} from 'angular2-cookie/services/cookies.service'


const appRoutes:Routes=[
  {
    path:"",
    redirectTo:"products",
    pathMatch:"full"
  },
  {
    path:"products",
    component:ProductComponent
  }, 
  {
    path:"products/:seoUrl",
    component:ProductComponent
  },
  {
    path:"my-cart",
    component:CartComponent
  },
  {
    path:"shipping-detail",
    component:ShippingDetailComponent , canActivate:[LoginGuard] , canDeactivate:[PendingChangesGuard]
  },
  {
    path:"account",
    component:AccountComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    CartComponent,
    AccountComponent,
    ShippingDetailComponent,
    CartSummaryComponent,
    LoggedComponent,
    NotFoundComponent,
    VatAddedPipe,
    ProductFilterPipe,
    CategoryProductItemsPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    AngularFontAwesomeModule ,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    { provide: "apiUrl", useValue: "http://northwindapi.azurewebsites.net/api" },
    NotificationsService,
    CartService,
    AccountService,
    LoginGuard,
    PendingChangesGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
