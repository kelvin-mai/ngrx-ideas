import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UIModule } from '@app/ui.module';
import { UUIDGuard } from '@app/services/uuid.guard';
import { AuthService } from '@app/services/auth.service';

import { IdeaEffects, ideaReducer } from './state';
import { IdeaResolver } from './idea.resolver';
import { IdeasComponent } from './ideas/ideas.component';
import { SelectedIdeaComponent } from './selected-idea/selected-idea.component';
import { NewIdeaComponent } from './new-idea/new-idea.component';
import { EditIdeaComponent } from './edit-idea/edit-idea.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewIdeaComponent,
    canActivate: [AuthService]
  },
  {
    path: ':id',
    component: SelectedIdeaComponent,
    canActivate: [UUIDGuard],
    resolve: { data: IdeaResolver }
  },
  {
    path: ':id/edit',
    component: EditIdeaComponent,
    canActivate: [UUIDGuard, AuthService],
    resolve: { data: IdeaResolver }
  },
  { path: '', component: IdeasComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UIModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('ideas', ideaReducer),
    EffectsModule.forFeature([IdeaEffects])
  ],
  declarations: [
    IdeasComponent,
    SelectedIdeaComponent,
    NewIdeaComponent,
    EditIdeaComponent
  ],
  providers: [IdeaResolver]
})
export class IdeaModule {}
