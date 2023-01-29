import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncreaseComponent } from './increase/increase.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncreaseComponent,
    DoughnutComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncreaseComponent,
    DoughnutComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
