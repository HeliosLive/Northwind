import { Component,DoCheck,OnInit} from '@angular/core';
import { AccountService } from './account/account.service'
import {NgForm} from '@angular/forms'
import {Router,ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'First Northwind Project';
  isLogTrue :boolean; 
  constructor(private accountService:AccountService,
              private router:Router) { }

  public options={
    position:["bottom","right"],
    timeOut:2000,
    lastOnBottom:true
  }

  ngOnInit(){
    alert("Web Servis olarak Azure ücretsiz kaynaklarına bağlı olduğu için bazı zamanlarda free kaynakları kapatabiliyorlar.");
    alert("Sayfayı yenilenidiğiniz halde Hata almaya devam ediyorsanız lütfen daha sonra tekrar deneyiniz.  ");
    alert("En kısa sürede yeni bir servis ile proje daha güzel bir hale getirilecektir. Teşekkürler.");
  }
  ngDoCheck() {
    this.isLogTrue = !this.accountService.isLoggedIn();
  }

  loginUser(form:NgForm){
    this.accountService.login(form.value.user,form.value.password).subscribe(t=>{
      if(t){
        this.router.navigateByUrl("products");
        this.isLogTrue= this.accountService.isLoggedIn();
      } 
      else{
        alert("UserName or Password is incorrect!");
      }
    });
  }

}
