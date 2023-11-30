import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBotonCuadraro]'
})
export class BotonCuadradoDirective {

  constructor(private e: ElementRef) {
    this.e.nativeElement.classList.add('bg-primary');
    this.e.nativeElement.classList.add('rounded-3');
    this.e.nativeElement.classList.add('bg-primary');
  }


  @HostListener('mouseenter') onMouseEnter() {
    this.e.nativeElement.backgroundColor = 'dimgray';
    this.e.nativeElement.color = 'white';
    this.e.nativeElement.cursor = 'pointer';
    this.e.nativeElement.border = '10px solid #42A5F5';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.e.nativeElement.backgroundColor = '';
    this.e.nativeElement.color = '';
    this.e.nativeElement.cursor = '';
    this.e.nativeElement.border = '';
  }
}
