import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss'
})
export class ThankYouComponent implements OnInit {

  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    this.analytics.track('view_calendar', {
      source: 'pricing_flow'
    });
  }

}
