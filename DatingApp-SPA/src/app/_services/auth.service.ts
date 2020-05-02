import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { logging } from 'protractor';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { from } from 'rxjs';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl+'auth/';
  decodedeToken: any;
  currentUser: User;
  jwtHelper = new JwtHelperService();
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl: string){
      this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((resonse: any) => {
        const user = resonse;

        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedeToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser= user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedinn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}

