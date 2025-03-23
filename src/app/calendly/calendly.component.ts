import { Component } from '@angular/core';

declare var Calendly: any;

@Component({
  selector: 'app-calendly',
  standalone: true,
  imports: [],
  templateUrl: './calendly.component.html',
  styleUrl: './calendly.component.scss'
})
export class CalendlyComponent {
  ngAfterViewInit(): void {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/theofficialwebsiteguys?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=b3cee3',
      parentElement: document.querySelector('.calendly-inline-widget'),
      prefill: {},
      utm: {}
    });
  }
}
