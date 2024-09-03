import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShowFullDescription]',
  standalone: true,
})
export class ShowFullDescriptionDirective {
  @Input('appShowFullDescription') fullDescription: string = '';

  private originalText: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.originalText = this.el.nativeElement.textContent;
    this.el.nativeElement.textContent = this.fullDescription;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.textContent = this.originalText;
  }
}
