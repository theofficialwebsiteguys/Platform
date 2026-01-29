import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { STRIPE_PAYMENT_LINKS } from '../plans/plans.constant';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-plan-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-confirmation.component.html',
  styleUrl: './plan-confirmation.component.scss'
})
export class PlanConfirmationComponent implements OnInit {
  @Input() plan!: { id: 'build' | 'launch' | 'scale'; name: string; price: number };

  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    this.analytics.track('view_plan_confirmation', {
      plan_name: this.plan.name
    });
  }

  goToStripe() {
    const link = STRIPE_PAYMENT_LINKS[this.plan.id];

    if (!link) return;

    this.analytics.track('begin_checkout', {
      plan_name: this.plan.name,
      plan_price: this.plan.price
    });

    // Redirect to Stripe Payment Link
    window.location.href = link;
  }
}
