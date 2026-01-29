import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-feature-steps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-steps.component.html',
  styleUrl: './feature-steps.component.scss',
  animations: [
    trigger('fadeIn', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out')
      ])
  ])
  ]
})
export class FeatureStepsComponent {
  activeStep = 0;

  steps = [
    {
      title: 'Connect',
      subtitle: 'Talk directly with the person building your site',
      heading1: 'Start with a Real Conversation,',
      heading2: 'Not a Sales Pitch',
      description:
        'We take time to understand your business, your goals, and what’s not working today. You’ll get clear direction, honest feedback, and a plan that actually makes sense.',
      cta: 'Book a Free Call',
      image: 'assets/connect.jpg',
    },
    {
      title: 'Design',
      subtitle: 'A custom design built around your brand',
      heading1: 'Designed From Scratch,',
      heading2: 'Built to Represent You',
      description:
        'Your site is designed specifically for your business — not adapted from a template. Every layout, interaction, and detail is intentional and built to convert.',
      cta: 'View the Design Process',
      image: 'assets/design.jpg',
    },
    {
      title: 'Launch',
      subtitle: 'A fast, secure, and scalable launch',
      heading1: 'Launch Confidently,',
      heading2: 'With Full Ownership',
      description:
        'We handle everything needed to launch your site properly — performance, security, hosting, and SEO fundamentals — so you’re ready to grow from day one.',
      cta: 'Get Started',
      image: 'assets/launch.jpg',
    },
  ];

  
  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80; // adjust for topbar / navbar height
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
  
}
