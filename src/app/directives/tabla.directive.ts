import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTabla]'
})
export class TablaDirective {

  constructor(private e: ElementRef) {
    this.e.nativeElement.classList.add('table');
    this.e.nativeElement.classList.add('table-bordered');
    this.e.nativeElement.classList.add('text-center');
    this.e.nativeElement.classList.add('text-dark');
  }

}
