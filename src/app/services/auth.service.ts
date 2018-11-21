import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';
import { AuthDTO, AuthType } from '@app/models/auth';
import { User } from '@app/models/user';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private api: string = environment.api_server + '/auth';

  constructor(private http: HttpClient) {}

  auth(authType: AuthType, data: AuthDTO): Observable<User> {
    console.log('auth type', authType);
    return this.http.post<User>(`${this.api}/${authType}`, data).pipe(
      mergeMap((user: User) => {
        this.token = user.token;
        return of(user);
      })
    );
  }

  whoami(): Observable<User> {
    return this.http.get<User>(`${this.api}/whoami`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }

  get token(): string {
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
