import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-loaders',
  templateUrl: './product-loaders.component.html',
  styleUrls: ['./product-loaders.component.scss'],
})
export class ProductLoadersComponent implements OnInit {
  @Input() imageSize = 190;
  @Input() barHeight = 15;
  @Input() bars = 1;

  public totalBars: { width: string }[] = [];
  public finalStyleImage = {};
  public finalHeightBar = '0';
  public finalHeightTitle = '0';
  public finalMarkWidth = '6rem';

  constructor() {}

  ngOnInit() {
    // Calculate total bars
    for (let i = 0; i < this.bars; i++) {
      // const width = Math.floor(Math.random() * (100 - 60)) + 60;
      this.totalBars.push({ width: `${100}%` });
    }

    // img style

    this.finalStyleImage = {
      width: `${this.imageSize}px`,
      height: `${this.imageSize}px`,
    };

    // bar style
    this.finalHeightBar = `${this.barHeight}px`;
    this.finalHeightTitle = `${this.barHeight * 3}px`;
  }
}
