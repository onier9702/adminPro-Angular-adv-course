import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { PagesComponent } from './pages.component';


const routes: Routes = [
  { path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard], // when we use lazy load we have to implement canLoad as well
    loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingRoutingModule { }
