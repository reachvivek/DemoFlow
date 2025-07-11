import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './landing/landing';

const routes: Routes = [
  {
    path: 'landing',
    component: Landing,
    pathMatch: 'full',
  },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./features/onboarding/onboarding-module').then(
        (m) => m.OnboardingModule
      ),
  },
  { path: '**', redirectTo: '/landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
