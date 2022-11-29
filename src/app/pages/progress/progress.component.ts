import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {

  public progress1: number = 35;
  public progress2: number = 50;

  get getPercentage1() {
    return `${this.progress1}%`;
  }
  get getPercentage2() {
    return `${this.progress2}%`;
  }

}
