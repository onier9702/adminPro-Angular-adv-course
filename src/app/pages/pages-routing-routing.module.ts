import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  { path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graphic1', component: Graphic1Component },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: 'profile', component: ProfileUserComponent },

      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingRoutingModule { }
