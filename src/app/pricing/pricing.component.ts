import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaqSectionComponent } from '../faq-section/faq-section.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FaqSectionComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  pricingPlans = [
    {
      name: 'Starter',
      description: 'Ideal for beginners',
      price: '$19',
      billingCycle: 'billed monthly',
      promo: 'First month free',
      popular: false,
      rates: [
        '3.0% + 20¢ per transaction',
        'No setup fees',
        'No hidden charges'
      ],
      features: [
        'Basic support',
        'Up to 2 user accounts',
        'Access to standard tools',
        'Community support',
        'Basic analytics'
      ],
      cta: 'Get started'
    },
    {
      name: 'Pro',
      description: 'For growing businesses',
      price: '$49',
      billingCycle: 'billed monthly',
      promo: 'Free for the first 14 days',
      popular: true,
      rates: [
        '2.5% + 15¢ per transaction',
        'Priority support',
        'Access to premium features'
      ],
      features: [
        'Up to 10 user accounts',
        'Advanced analytics',
        'Customizable templates',
        'Integration with third-party apps',
        '24/7 email support'
      ],
      cta: 'Start your trial'
    },
    {
      name: 'Enterprise',
      description: 'For established companies',
      price: '$199',
      billingCycle: 'billed annually',
      promo: 'Save 20% with annual billing',
      popular: false,
      rates: [
        '1.5% + 10¢ per transaction',
        'Dedicated account manager',
        'Custom SLA'
      ],
      features: [
        'Unlimited user accounts',
        'Advanced security features',
        'Custom integrations',
        'Dedicated support',
        'Onboarding assistance'
      ],
      cta: 'Request a demo'
    },
    {
      name: 'Ultimate',
      description: 'For enterprises with custom needs',
      price: 'Contact us',
      billingCycle: 'Custom billing options',
      promo: 'Tailored solutions available',
      popular: false,
      rates: [
        'Custom transaction rates',
        'Personalized service',
        'Enterprise-level security'
      ],
      features: [
        'Custom user roles',
        'Priority 24/7 support',
        'Bespoke features',
        'Dedicated infrastructure',
        'Custom training and onboarding'
      ],
      cta: 'Contact sales'
    }
  ];

}
