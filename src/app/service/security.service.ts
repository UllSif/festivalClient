import {Injectable} from '@angular/core';
import {User} from "../entity/user.entity";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

const TOKEN_LOCALSTORAGE_KEY = 'token';
const USER_LOCALSTORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private user: User;
  private token: string = null;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.apiPrefix + '/login_check', {
      username,
      password
    })
      .pipe(
        tap(result => {
          this.setToken(result.token, result.user);
        })
      )
  }

  setToken(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, JSON.stringify(this.token));
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(this.user));
  }

  getToken() {
    return this.token;
  }

  isConnected() {
    return this.token !== null;
  }

  logOut() {
    this.token = null;
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }

  getCurrentUser(): User {
    return this.user;
  }

  restoreConnection() {
    const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
    const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (token && user) {
      this.token = JSON.parse(token);
      this.user = JSON.parse(user);
    }
  }
}
