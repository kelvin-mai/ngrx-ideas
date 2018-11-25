import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { UIModule } from '@app/ui.module';
import { EffectsModule } from '@ngrx/effects';
import { ideaReducer } from './state/idea.reducer';
import { IdeaEffects } from './state/idea.effects';
import { IdeasComponent } from './ideas/ideas.component';
import { IdeaComponent } from './ideas/idea/idea.component';

const routes: Routes = [
  { path: '', component: IdeasComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('ideas', ideaReducer),
    EffectsModule.forFeature([IdeaEffects])
  ],
  declarations: [IdeasComponent, IdeaComponent]
})
export class IdeaModule {}
