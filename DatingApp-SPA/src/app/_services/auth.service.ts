import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logging } from 'protractor';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl= 'http://localhost:5000/api/auth/';

constructor(private http: HttpClient) { }

  login( model: any){
    return this.http.post(this.baseUrl + 'login', model).
    pipe(
      map((resonse : any) => {
        const user = resonse;

        if(user){
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any){
    return this.http.post(this.baseUrl+'register', model);
  }


}
