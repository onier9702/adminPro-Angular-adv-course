import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingRoutingModule } from './pages-routing-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphic1Component } from './graphic1/graphic1.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graphic1Component,
    NotFoundComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
