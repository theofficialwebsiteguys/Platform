import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneFormat]',
  standalone: true
})
export class PhoneFormatDirective {

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this.el.nativeElement.value.replace(/\D/g, '');
    if (input.length <= 10) {
      let formatted = input;
      if (input.length > 6) {
        formatted = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
      } else if (input.length > 3) {
        formatted = `${input.slice(0, 3)}-${input.slice(3, 6)}`;
      }
      this.el.nativeElement.value = formatted;
      this.control.control?.setValue(formatted);
    }
  }
}
