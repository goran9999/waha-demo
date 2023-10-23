import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { env } from '../config/env';
import { User } from '../model/user.model';
@Injectable()
export class UserService {
  api = env.api;
  user: User;
  constructor(private http: HttpClient) {}
  isLoggedIn() {
    return localStorage.getItem('user.googleID') !== null;
  }

  register(jwt: string) {
    const params = new HttpParams();
    params.append('jwt', jwt);

    return this.http.get(`${this.api}/user/register?jwt=${jwt}`);
  }

  hasUserLikedWhatsapp() {
    const whatsappData = localStorage.getItem('user.whatsapp');

    if (!whatsappData) {
      return false;
    } else {
      const parsedWhatsapp = whatsappData.split(',');
      return parsedWhatsapp.length > 0;
    }
  }

  getUserId() {
    return localStorage.getItem('user.id');
  }

  getUser() {
    const email = localStorage.getItem('user.email');
    if (!email) {
      console.log('User not logged in!');
      return;
    }
    return this.http.get(
      `${this.api}/user/me/${localStorage.getItem('user.email')}`
    );
  }

  extractJwt() {
    return localStorage.getItem('user.jwt');
  }
}
