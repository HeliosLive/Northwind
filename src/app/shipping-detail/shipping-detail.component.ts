import { Component, OnInit, ViewChild, Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ShippingDetail } from "./shipping-detail";
import { NotificationsService } from "angular2-notifications";
import { CartService } from "../cart/cart.service";
import { Router } from "@angular/router";
import { ComponentCanDeactivate } from "../guards/pending-changes.guard";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter
} from "rxjs/operators";
import { Observable, Subject, merge } from "rxjs";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { CategoryService } from "../category/category.service";
import { Category } from "../category/category";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerI18n
} from "@ng-bootstrap/ng-bootstrap";
import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

const valentinesDayDate: NgbDateStruct = { day: 14, month: 2, year: 2019 }; // February, 14 2018
const now = new Date();
const I18N_VALUES = {
  fr: {
    weekdays: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
    months: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Aou",
      "Sep",
      "Oct",
      "Nov",
      "Déc"
    ]
  },
  // other languages you would support
  tr: {
    weekdays: ["Pzt", "Salı", "Çarş", "Perş", "Cuma", "Cmt", "Pzr"],
    months: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık"
    ]
  }
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = "tr";
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: "app-shipping-detail",
  templateUrl: "./shipping-detail.component.html",
  styleUrls: ["./shipping-detail.component.css"],
  providers: [
    CategoryService,
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ]
})
export class ShippingDetailComponent implements OnInit, ComponentCanDeactivate {
  constructor(
    private cartService: CartService,
    private notificationsService: NotificationsService,
    private router: Router,
    private categoryService: CategoryService,
    private calendar: NgbCalendar
  ) {}
  cities = [];
  cargoFirms = [];
  kategoriler = [];
  ngCategories: Category[];
  model: ShippingDetail = new ShippingDetail("", "", false, -1, null, "", null);

  dateModel: NgbDateStruct;
  date: { year: number; month: number; today: number };
  isDirty: boolean = false;
  isShoppingCompleted: boolean = false;

  canDeactivate() {
    return !this.isDirty;
  }

  ngOnInit() {
    this.cities.push(
      { id: 1, name: "Ankara" },
      { id: 2, name: "İstanbul" },
      { id: 3, name: "İzmir" },
      { id: 4, name: "Antalya" },
      { id: 5, name: "Bursa" },
      { id: 6, name: "Samsun" },
      { id: 7, name: "Mersin" },
      { id: 8, name: "New York" },
      { id: 9, name: "Paris" },
      { id: 10, name: "Madrid" },
      { id: 11, name: "Berlin" },
      { id: 12, name: "Amsterdam" },
      { id: 13, name: "London" }
    );
    this.cargoFirms = [
      "Aras Kargo",
      "Mng Kargo",
      "Ptt Kargo",
      "UPS",
      "Yurtiçi Kargo",
      "Sürat Kargo",
      "DHL Express"
    ];

    this.categoryService.getCategories().forEach(element => {
      for (let item of element) {
        this.kategoriler.push(item.categoryName);
      }
    });
  }

  @ViewChild("instance")
  instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term =>
        (term === ""
          ? this.cargoFirms
          : this.cargoFirms.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  searchCategory = (text$: Observable<string>) => {
    const debouncedText1$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup1$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus1$ = this.focus$;

    return merge(debouncedText1$, inputFocus1$, clicksWithClosedPopup1$).pipe(
      map(terminal =>
        (terminal === ""
          ? this.kategoriler
          : this.kategoriler.filter(
              v => v.toLowerCase().indexOf(terminal.toLowerCase()) > -1
            )
        ).slice(0, 10)
      )
    );
  };

  checkout(form: NgForm) {
    if (form.invalid) {
      return;
    }

    ////  TEST ALERTLERİ
    var gifty = this.model.isGift == true ? "Yes" : "NO";
    alert("form.controls fullname : " + form.controls.fullName.value); //formdaki bir değeri alabilir
    alert("this.model Full Name : " + this.model.fullName); //formdaki modele aktarılan bir değeri alabilir!
    alert("Adres : " + this.model.address);
    alert("Cargo Firm : " + this.model.cargoFirm);
    alert("City : " + this.model.cityId);
    alert("Gitf ? : " + gifty);
    alert("Delivery Date Day : " + this.model.deliveryDate["day"]);
    alert("Delivery Date Month : " + this.model.deliveryDate["month"]);
    alert("Delivery Date Year : " + this.model.deliveryDate["year"]);
    alert(
      "Delivery Date All : " +
        this.model.deliveryDate["day"] +
        "/" +
        this.model.deliveryDate["month"] +
        "/" +
        this.model.deliveryDate["year"]
    );
    alert("Optinal Kategori : " + this.model.optionCategory);
    console.log(form.value);
    /////  TEST ALERTLERİ

    this.cartService.clear();
    this.notificationsService.info("Successfull", "Shopping completed!");
    this.router.navigate(["products"]);
  }

  completeShopping() {
    this.isShoppingCompleted = true;
  }

  isDateDisabled() {
    //yıllık izin tarihlerini burada seçtirmeyebiliriz.
  }

  selectToday() {
    this.dateModel = this.calendar.getToday();
  }
  valentinesDay() {
    this.dateModel = { year: 2018, month: 2, day: 14 }; //çalışmıyor ? calender a atamadığımızdandır ..?
  }
}
