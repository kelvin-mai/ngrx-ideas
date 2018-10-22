import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [StoreModule.forRoot({}), StoreDevtoolsModule.instrument()]
})
export class AppStoreModule {}
