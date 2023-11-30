import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appBotonCirculo]'
})
export class BotonCirculoDirective {
  // transform: scale(1.1); 
  //   border:10px solid #42A5F5;

  constructor(private e: ElementRef) {
    //cirdiv border border-3 border-secondary
    this.e.nativeElement.classList.add('border');
    this.e.nativeElement.classList.add('border-3');
    this.e.nativeElement.classList.add('border-secondary');
    this.e.nativeElement.width = '150px';
    this.e.nativeElement.height = '150px';
    this.e.nativeElement.borderRadius = '50%';
    this.e.nativeElement.overflow = 'hidden';
    this.e.nativeElement.position = 'relative';
    this.e.nativeElement.display = 'flex';
    this.e.nativeElement.alignItems = 'center';
    this.e.nativeElement.justifyContent = 'center';
    this.e.nativeElement.transition = 'all 0.3s ease-in-out';



  }

  @HostListener('mouseenter') onMouseEnter() {
    this.e.nativeElement.transform = 'scale(1.1)';
    this.e.nativeElement.border = '10px solid #42A5F5';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.e.nativeElement.transform = 'scale(1.0)';
    this.e.nativeElement.border = '0px solid #42A5F5';
  }



}
