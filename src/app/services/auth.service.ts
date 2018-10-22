import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { Auth, AuthType } from '@app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api_server + '/auth';

  constructor(private http: HttpClient) {}

  auth(authType: AuthType, data: Auth) {
    return this.http.post(`${this.api}/${authType}`, data);
  }

  get token() {
    return localStorage.getItem('idea_token');
  }

  set token(val: string) {
    if (val) {
      localStorage.setItem('idea_token', val);
    } else {
      localStorage.clear();
    }
  }
}
