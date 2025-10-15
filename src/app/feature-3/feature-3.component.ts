import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-feature-3',
  standalone: true,
  imports: [],
  templateUrl: './feature-3.component.html',
  styleUrl: './feature-3.component.scss',
  animations: [
    trigger('sectionAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms cubic-bezier(0.23, 1, 0.32, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 0, transform: 'translateY(40px)' })
        )
      ])
    ])
  ]
})
export class Feature3Component implements AfterViewInit {
 constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    // ✅ Only run this in the browser
    if (isPlatformBrowser(this.platformId)) {
      const blocks = this.el.nativeElement.querySelectorAll('.service-block');

      const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Visible:', entry.target); // 👈 Add this
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });


      blocks.forEach((block: Element) => observer.observe(block));
    }
  }
}
