import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './store';
import { SetInitialUser } from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-ideas';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new SetInitialUser());
  }
}
