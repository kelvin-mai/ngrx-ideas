import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AppState } from '@app/store';
import { uuid } from '@app/utilities/uuid';

@Injectable()
export class UUIDGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(): Observable<boolean> {
    return this.store
      .select(state => state.router.state.params.id)
      .pipe(
        take(1),
        map(val => uuid.test(val))
      );
  }
}
