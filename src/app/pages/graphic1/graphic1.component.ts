import { Component } from '@angular/core';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [
  ]
})
export class Graphic1Component {

  public labels1: string[] = ['Facebook', 'Twitter', 'Instagram'];
  public data1: number[] = [60,35,100];

  public labels2: string[] = ['Football', 'Basketball', 'Baseball'];
  public data2: number[] = [300,190,100];

  public labels3: string[] = ['Apple', 'Google', 'Amazon'];
  public data3: number[] = [210,170,120];

  public labels4: string[] = ['Iphone 12 Pro Max', 'Samsung Galaxy Ultra', 'Huawey P40'];
  public data4: number[] = [230,190,200];

}
