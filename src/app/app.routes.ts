import { Routes } from '@angular/router';

import { authGuard } from './guard/auth.guard';
import { CreateListComponent } from './components/list/create-list/create-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: CreateListComponent, canActivate: [authGuard] },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (mod) => mod.AboutComponent
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
