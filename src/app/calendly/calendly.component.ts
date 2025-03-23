import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare var Calendly: any;

@Component({
  selector: 'app-calendly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendly.component.html',
  styleUrl: './calendly.component.scss'
})
export class CalendlyComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && typeof Calendly !== 'undefined') {
      // Delay to ensure the DOM is ready and element exists
      setTimeout(() => {
        const el = document.querySelector('.calendly-inline-widget');
        if (el) {
          Calendly.initInlineWidget({
            url: 'https://calendly.com/theofficialwebsiteguys?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=b3cee3',
            parentElement: el,
            prefill: {},
            utm: {}
          });
        } else {
          console.warn('[Calendly] Inline widget container not found.');
        }
      }, 0);
    }
  }
}
