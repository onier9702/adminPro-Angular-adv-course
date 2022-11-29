import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styles: [
  ]
})
export class IncreaseComponent implements OnInit {

  @Input('valueInput') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';
  @Output('valueEmitted') changeEmitter: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  moveProgress( value: number ): void | number {
    if ( this.progress === 100 && value > 0 ) {
      this.changeEmitter.emit(100);
      return this.progress = 100;
    }
    if ( this.progress === 0 && value < 0 ) {
      this.changeEmitter.emit(0);
      return this.progress = 0;
    }
    this.progress += value;
    this.changeEmitter.emit(this.progress);
  }

  onInputChange(value: number): void {
    if ( value >= 100 ) {
      this.progress = 100;
    } else if ( value <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.changeEmitter.emit(this.progress);
  }

}
