import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './landing/landing';

const routes: Routes = [{ path: '', component: Landing }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
