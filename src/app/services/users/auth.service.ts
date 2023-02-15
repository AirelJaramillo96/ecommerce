import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Auth } from "../../models/auth.model";
import {User} from "../../models/user.module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `${environment.API_URL}/api/auth`;
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiURL}/login`, {email, password});
  }

  profile(token: string) {

    return this.http.get<User>(`${this.apiURL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        //'Content-Type': 'application/json'
      }
    });
  }

}
