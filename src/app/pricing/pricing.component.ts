import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, FaqSectionComponent, RouterModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  pricingPlans = [
    {
      name: 'Custom Website',
      description: 'Perfect for any size business looking for a strong online presence.',
      price: 'Starting at $500',
      promo: 'Quick & Easy',
      popular: true,
      features: [
        'Single/Multi Page',
        'Custom Design + Contact Form',
        'FREE 24/7 Maintenance & Support (1 Month)',
        'Free Domain (1 Year)',
        'Basic Analytics'
      ],
      cta: 'Get Started'
    },
    {
      name: 'E-Commerce Shop',
      description: 'Expand your reach and connect with customers through a complete online store.',
      price: 'Starting at $2,000',
      promo: 'Sell Online Effortlessly',
      popular: false,
      features: [
        'Single/Multi Page',
        'Custom Design + Contact Form',
        'Full Shopping Experience',
        'Cart + Checkout Functionality',
        'FREE 24/7 Maintenance & Support (1 Month)',
        'Free Domain (1 Year)',
        'Basic Analytics'
      ],
      cta: 'Start Selling Today'
    },
    {
      name: 'Mobile Application',
      description: 'Bring your business to customers’ fingertips with a tailored mobile experience.',
      price: 'Starting at $5,000',
      promo: 'Your Business, Mobile-Ready',
      popular: false,
      features: [
        'Hybrid Design for IOS & Android',
        '24/7 Maintenance & Support (1 Month)',
        'Free Domain (1 Year)',
        'Basic Analytics'
      ],
      cta: 'Go Mobile'
    },
    {
      name: 'Software Development',
      description: 'For complex needs and large-scale projects that require custom software solutions.',
      price: 'Schedule a meeting today.',
      promo: 'Innovate and Scale',
      popular: false,
      features: [
        'Custom Software Design & Architecture',
        'FREE 24/7 Maintenance & Support (1 Month)'
      ],
      cta: 'Schedule A Meeting'
    }
  ];

}
