import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent implements OnInit {

  @Input('title') titleDoughnut: string = 'Title';
  @Input() categories: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input('dataChart') data: number[] = [ 350, 450, 100 ];
  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.categories,
    datasets: [
      { data: this.data },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    this.doughnutChartData.labels = this.categories;
    this.doughnutChartData.datasets[0].data = this.data;
  }

}
