import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { UIModule } from '@app/ui.module';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('ideas', {}),
    EffectsModule.forFeature([])
  ],
  declarations: []
})
export class IdeaModule {}
