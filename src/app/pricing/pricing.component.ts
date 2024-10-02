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
      name: 'Single-Page Websites',
      description: 'Ideal for Event Pages, Landing Pages, Personal Blogs/Resumes',
      price: '$29',
      promo: 'Quick & Easy',
      popular: false,
      features: [
        '1 Page Website',
        'Custom Design',
        '24/7 Maintenance & Support',
        'Free Domain (1 Year)',
        'Basic analytics'
      ],
      cta: 'Get Started Free'
    },
    {
      name: 'Standard Website',
      description: 'For Small to Medium sized businesses. Restaurants, Shops, Service.',
      price: '$53',
      promo: 'Take Your Business Online',
      popular: true,
      features: [
        '2-8 Page Website',
        'Custom Design',
        '24/7 Maintenance & Support',
        'Free Domain (1 Year)',
        'Basic analytics'
      ],
      cta: 'Get Started Free'
    },
    {
      name: 'Advanced Website',
      description: 'For medium to large established companies.',
      price: '$86',
      promo: 'Ensure your clients are satisfied.',
      popular: false,
      features: [
        '8+ Page Website',
        'Custom Design',
        '24/7 Maintenance & Support',
        'Free Domain (1 Year)',
        'SEO & Marketing Consulting',
        'Advanced analytics'
      ],
      cta: 'Get Started Free'
    },
    {
      name: 'E-Commerce Shop',
      description: 'For businesses looking to sell their products online to customers.',
      price: '$129',
      promo: 'Sell Your Product',
      popular: false,
      features: [
        '1-8 Page Ecommerce Website',
        'Custom Design',
        '24/7 Maintenance & Support',
        'Free Domain (1 Year)',
        'SEO & Marketing Consulting',
        'Advanced analytics',
        ''
      ],
      cta: 'Start Selling'
    }
  ];

}
