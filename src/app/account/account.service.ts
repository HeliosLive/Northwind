import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {CookieService} from 'angular2-cookie/core'


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private LoggedIn = false;

  constructor(@Inject('apiUrl') private apiUrl,
              private http: Http,
              private cookieService:CookieService) { }

  login(username, password): Observable<boolean> {
    let url: string = this.apiUrl + "/account/login";
    let headers = new Headers();
    headers.append("Authorization", btoa(username + ":" + password))

    var requestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, JSON.stringify({ username, password }), requestOptions)
      .map(res => res.json())
      .map(res => {
        if (res) {
          this.cookieService.put('loginUser',res);
          localStorage.setItem("isLogged", res)
          this.LoggedIn = true;
        }
        return res;
      });
  }

  logOut(){
    this.cookieService.remove('loginUser');
    localStorage.removeItem('isLogged');
    this.LoggedIn=false;
  }

  isLoggedIn(){
    return this.LoggedIn;
  }

}
