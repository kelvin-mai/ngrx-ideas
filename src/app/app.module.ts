import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/app-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AppStoreModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
