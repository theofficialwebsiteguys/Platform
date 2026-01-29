import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AnalyticsService } from '../analytics.service';

type PlanKey = 'essential' | 'growth' | 'expansion';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent implements OnInit {
  isBrowser = false;

  plans: Record<PlanKey, { id: PlanKey; name: string; price: number }> = {
    essential: { id: 'essential', name: 'Essential', price: 99 },
    growth: { id: 'growth', name: 'Growth', price: 199 },
    expansion: { id: 'expansion', name: 'Expansion', price: 399 }
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private analytics: AnalyticsService,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0 });
    }
  }

  /**
   * User expresses interest in a plan
   * Save intent and send them to the contact form
   */
  selectPlan(key: PlanKey) {
    const selectedPlan = this.plans[key];

    // ✅ Persist intent for homepage form
    sessionStorage.setItem('selectedPlan', key);

    // ✅ Track intent (not checkout)
    this.analytics.track('mockup_interest', {
      plan_name: selectedPlan.name,
      plan_price: selectedPlan.price
    });

    // ✅ Navigate home, then scroll to contact form
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (!el) return;

        const yOffset = -100; // fixed navbar height
        const y =
          el.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 75);
    });
  }
}
