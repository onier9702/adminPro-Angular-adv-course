import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { PagesComponent } from './pages.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ProgressComponent } from './progress/progress.component';
// Maintenance
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { NewDoctorComponent } from './maintenance/doctors/new-doctor/new-doctor.component';

import { QuestGeneralComponent } from './quest-general/quest-general.component';
import { AdminGuard } from '../guards/admin.guard';

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

      { path: 'hospitals', component: HospitalsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'doctor/:id', component: NewDoctorComponent, title: 'One-Doctor' },
      
      { path: 'search/:term', component: QuestGeneralComponent, title: 'General-Search' },
      
      // admin routes
      { path: 'users', 
        component: UsersComponent,
        canActivate: [AdminGuard]
      },

      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingRoutingModule { }
