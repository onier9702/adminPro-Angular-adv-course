import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingRoutingModule } from './pages-routing-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphic1Component,
    NotFoundComponent,
    PagesComponent,
    AccountSettingsComponent,
    ProfileUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingRoutingModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
