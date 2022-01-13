import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMainBg]',
})
export class MainBgDirective {
  @Input() appMainBg: boolean = true;
  constructor(el: ElementRef) {
    console.log(this.appMainBg);
    if (this.appMainBg) {
      el.nativeElement.style.backgroundColor = 'green';
      el.nativeElement.style.color = 'white';
      el.nativeElement.style.fontWeight = 700;
    }
  }
}
