import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '@app/components/auth/auth.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'ideas', loadChildren: '@app/features/idea/idea.module#IdeaModule' },
  { path: 'users', loadChildren: '@app/features/user/user.module#UserModule' },
  { path: '**', redirectTo: 'ideas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
